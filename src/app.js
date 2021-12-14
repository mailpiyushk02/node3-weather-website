const path = require("path");
const express = require("express");
const hbs = require("hbs");
const getLocation = require("./utils/getLocation");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const dir = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlesbars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(dir));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Piyush",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Piyush",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helptext: "The help page",
    title: "Help",
    name: "Piyush",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address must be provided",
    });
  }

  //Maithon Jharkhand IN 828207
  getLocation(req.query.address, (error, data) => {
    if (error) {
      return res.send({ error });
    }
    forecast([data.latitude, data.longitude], (error, forecastdata) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastdata,
        location: req.query.address,
        // address: {
        //   city: data.city,
        //   country: data.country,
        // },
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Piyush",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Piyush",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

// app.listen(3001, () => {
//   console.log("Server is up on port 3001");
// });

// app.listen(3002, () => {
//   console.log("server is up on port");
// });
