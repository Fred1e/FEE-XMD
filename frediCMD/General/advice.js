//advice.js

const advice = require("badadvice");

module.exports = async (context) => {
        const { client, m } = context;
await m.reply(advice());

}