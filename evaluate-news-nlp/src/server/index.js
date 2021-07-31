var path = require('path');
const mockAPIResponse = require('./mockAPI.js');
const fetch = require("node-fetch");
// require to get environment variable
const dotenv = require('dotenv');
dotenv.config();

console.log(`Your API key is ${process.env.API_KEY}`);

const express = require('express');

const app = express();

const baseURL= 'https://api.meaningcloud.com/sentiment-2.1';

let projectData = {};

//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

app.use(express.static('dist'))

console.log(__dirname);

app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
    //res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!');
})

app.get('/test', function (req, res) {
    console.log(mockAPIResponse);
    res.send(mockAPIResponse);
})

app.get('/results', (req, res) => {
    res.send(projectData);
})

app.post('/textAnalysis', async (req, res) => {
    const url = `${baseURL}?key=${process.env.API_KEY}&url=${req.body.text}&lang=en`;
    const response = await fetch(url);
    try{
        const data = await response.json();
        console.log(data);
        projectData = data;
        res.send(data);
    } catch(err){
        console.log("error", err);
    }
})
