const fetch = require("request");

const forecast = (location, callback) => {
  const url = `https://api.weatherapi.com/v1/current.json?key=b16432a4f5b14820a76121854210310&q=${[
    ...location,
  ]}&aqi=yes`;

  fetch(url, (error, response) => {
    const data = JSON.parse(response.body);
    if (error) {
      callback("Unable to connect to server", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `It is currently ${data.current.temp_c} degrees Celsius. It is ${data.current.condition.text} and there is ${data.current.precip_mm}% chance of rain today.
        Wind Speed: ${data.current.wind_kph}kph
        Pressure: ${data.current.pressure_mb}mb
        Humidity: ${data.current.humidity}
        `
      );
    }
  });
};

module.exports = forecast;
