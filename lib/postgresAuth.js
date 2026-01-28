const { proto, BufferJSON, initAuthCreds } = require('@whiskeysockets/baileys');
const { Pool } = require('pg');

/**
 * Custom Auth State for PostgreSQL (Supabase)
 * @param {string} connectionString - The DATABASE_URL
 * @returns {Promise<{ state: AuthenticationState, saveCreds: () => Promise<void> }>}
 */
const usePostgresAuthState = async (connectionString) => {
    const pool = new Pool({
        connectionString,
        ssl: {
            rejectUnauthorized: false
        }
    });

    // Ensure table exists
    await pool.query(`
        CREATE TABLE IF NOT EXISTS auth_keys (
            id TEXT PRIMARY KEY,
            data JSONB
        );
    `);

    const readData = async (id) => {
        try {
            const res = await pool.query('SELECT data FROM auth_keys WHERE id = $1', [id]);
            if (res.rows.length > 0) {
                return JSON.parse(JSON.stringify(res.rows[0].data), BufferJSON.reviver);
            }
            return null;
        } catch (error) {
            console.error('Error reading auth data', error);
            return null;
        }
    };

    const writeData = async (id, data) => {
        try {
            const json = JSON.stringify(data, BufferJSON.replacer);
            await pool.query(
                `INSERT INTO auth_keys (id, data) VALUES ($1, $2) 
                 ON CONFLICT (id) DO UPDATE SET data = $2`,
                [id, json]
            );
        } catch (error) {
            console.error('Error writing auth data', error);
        }
    };

    const removeData = async (id) => {
        try {
            await pool.query('DELETE FROM auth_keys WHERE id = $1', [id]);
        } catch (error) {
            console.error('Error removing auth data', error);
        }
    };

    const creds = (await readData('creds')) || initAuthCreds();

    return {
        state: {
            creds,
            keys: {
                get: async (type, ids) => {
                    const data = {};
                    await Promise.all(
                        ids.map(async (id) => {
                            const value = await readData(`${type}-${id}`);
                            if (type === 'app-state-sync-key' && value) {
                                data[id] = proto.Message.AppStateSyncKeyData.fromObject(value);
                            } else if (value) {
                                data[id] = value;
                            }
                        })
                    );
                    return data;
                },
                set: async (data) => {
                    const tasks = [];
                    for (const category in data) {
                        for (const id in data[category]) {
                            const value = data[category][id];
                            const key = `${category}-${id}`;
                            if (value) {
                                tasks.push(writeData(key, value));
                            } else {
                                tasks.push(removeData(key));
                            }
                        }
                    }
                    await Promise.all(tasks);
                }
            }
        },
        saveCreds: () => {
            return writeData('creds', creds);
        }
    };
};

module.exports = usePostgresAuthState;
