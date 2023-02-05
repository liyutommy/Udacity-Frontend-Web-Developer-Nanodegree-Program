// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;

app.listen(port, () => {
  console.log("server running...");
  console.log(`running on localhost: ${port}`);
});


// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Post request 
app.post('/addWeather', (req, res) => {
  // Save data
  projectData = req.body;
  console.log("Post request sending:", projectData);
  res.send(projectData);
});

// get request
app.get('/all', (req, res) => {
  console.log("Get request sending:", projectData);
  res.send(projectData);
});