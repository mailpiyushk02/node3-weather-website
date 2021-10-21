const fetch = require("request");

const getLocation = (address, callback) => {
  const URL = `https://geocode.xyz/${address}?json=1`;

  fetch(URL, (error, response) => {
    const data = JSON.parse(response.body);
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (!data.latt) {
      callback("Unable to find location! Try another search", undefined);
    } else {
      callback(undefined, {
        latitude: data.latt,
        longitude: data.longt,
        // city: data.standard.city,
        // country: data.standard.countryname,
      });
    }
  });
};

module.exports = getLocation;
