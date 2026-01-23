module.exports = async (context) => {
  const { m, text } = context;

  try {
    if (!text) {
      return m.reply(`❥┈┈┈┈┈┈┈┈┈┈┈┈┈┈➤\n│✿ Yo, genius, give me a city or town name! Don’t waste my time.`);
    }

    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${text}&units=metric&appid=1ad47ec6172f19dfaf89eb3307f74785`);
    const data = await response.json();

    console.log(`✅ Fetched weather data for ${text}`);

    if (data.cod !== 200) {
      return m.reply(`❥┈┈┈┈┈┈┈┈┈┈┈┈┈┈➤\n│✿ What the hell? Can’t find ${text}. Pick a real place, idiot.`);
    }

    const cityName = data.name;
    const temperature = data.main.temp;
    const feelsLike = data.main.feels_like;
    const minTemperature = data.main.temp_min;
    const maxTemperature = data.main.temp_max;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const rainVolume = data.rain ? data.rain['1h'] : 0;
    const cloudiness = data.clouds.all;
    const sunrise = new Date(data.sys.sunrise * 1000);
    const sunset = new Date(data.sys.sunset * 1000);

    await m.reply(`❥┈┈┈┈┈┈┈┈┈┈┈┈┈┈➤
│❒ Weather in *${cityName}* 🌎
├──────────────┤
│❒ 🌡️ Temp: ${temperature}°C
├──────────────┤
│❒ 🥵 Feels Like: ${feelsLike}°C
├──────────────┤
│❒ 📝 Conditions: ${description}
├──────────────┤
│❒ 💧 Humidity: ${humidity}%
├──────────────┤
│❒ 🌀 Wind: ${windSpeed} m/s
├──────────────┤
│❒ 🌧️ Rain (1h): ${rainVolume} mm
├──────────────┤
│❒ ☁️ Clouds: ${cloudiness}%
├──────────────┤
│❒ 🌄 Sunrise: ${sunrise.toLocaleTimeString()}
├──────────────┤
│❒ 🌅 Sunset: ${sunset.toLocaleTimeString()}
❥┈┈┈┈┈┈┈┈┈┈┈┈┈┈➤`);
  } catch (e) {
    console.error(`❌ Error fetching weather for ${text}: ${e.message}`);
    await m.reply(`❥┈┈┈┈┈┈┈┈┈┈┈┈┈┈➤\n│✿ Ugh, something broke, or ${text} ain’t a real place. Try again, moron.`);
  }
};