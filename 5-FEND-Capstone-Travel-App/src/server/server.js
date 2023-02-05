let path = require('path');
const fetch = require("node-fetch");
const express = require('express');

// Start up an instance of app
const app = express();

//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

// Setup Server
const port = 8081;

app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
})

app.listen(port, () => {
    console.log('server running...');
    console.log(`running on localhost:${port}`);
})

let projectData = {};

app.post('/postTraveInfo', (req, res) => {
    projectData = req.body;
    console.log(projectData);
    res.send(projectData);
})

app.get('/projectData', (req, res) => {
    res.send(projectData);
})

module.exports = app;