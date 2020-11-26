// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// ############################################################
// Setup Server

// GET Routes
app.get("/all", function (req, res) {
  console.log("Handling a GET request");
  res.send(projectData);
});

// POST Routes
app.post("/newEntry", function (req, res) {
  console.log("Handling a POST request");

  // Recording the new entry
  projectData.temperature = req.body.temperature;
  projectData.date = req.body.date;
  projectData.userResponse = req.body.userResponse;

  res.json("Response");
});

// Run Server
const port = 8000;
function listening() {
  console.log("server running");
  console.log(`running on localhost: ${port}`);
}
const server = app.listen(port, listening);
