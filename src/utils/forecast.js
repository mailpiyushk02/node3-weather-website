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
        `It is currently ${data.current.temp_c} degrees out. There is ${data.current.precip_mm} chance of rain.`
      );
    }
  });
};

module.exports = forecast;
