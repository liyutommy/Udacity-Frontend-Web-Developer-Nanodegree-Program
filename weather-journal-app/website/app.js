/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=78cb289771c95e27ca808f0c228bf6c2&units=imperial';

// click event trigers getWeather function
document.getElementById('generate').addEventListener('click', getWeather);

// getWeatherData => postData => updateUI
async function getWeather() {
    // get user's inputs
    const zipCode = document.getElementById('zip').value;
    const countryCode = document.getElementById('country').value;

    getWeatherData(baseURL, zipCode, countryCode, apiKey)
    .then((weatherData) => { // weatherData is the return value from getWeatherData function
        console.log(weatherData);
        // get date and feelings entered from users
        let d = new Date();
        let newDate = `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()}`;
        const feelings = document.getElementById('feelings').value;
        console.log(newDate, feelings);
        // construct a data object 
        const dataObj = {
            temperature: weatherData.main.temp,
            location: weatherData.name,
            date: newDate,
            userResponse: feelings,
        }
        // pass the data object to the url /addWeather in server side
        return postData('/addWeather', dataObj);
    }).then(
        () => {
            // update DOM element to tell user the weather data
            updateUI();}
    )
}

const getWeatherData = async (baseURL, zip, country, key) => {
    // check if the length of zip code and country code is correct
    if (zip.length != 5) {
        alert("The length of zip code should be 5!");
        return;
    }
    if (country.length != 2) {
        alert("The length of country code should be 2!");
        return;
    }

    // api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
    const url = `${baseURL}${zip},${country}${key}`;
    // get weather data
    const response = await fetch(url);
    console.log(response);
    try {
        // resp.json returns a promise that resolves to a JS object  
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

const postData = async (url='', postData={}) => {
    console.log(postData);
    // init: An object containing any custom settings that you want to apply to the request
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    });
    console.log(response);
    try{
        const data = await response.json();
        console.log(data);
        return data;
    } catch(error){
        console.log("error", error);
    }
}

const updateUI = async () => {
    const response = await fetch("/all");
    console.log(response);
    try{
        const data = await response.json();
        console.log(data);
        document.getElementById('date').innerHTML = `Date: ${data.date}`;
        document.getElementById('loca').innerHTML = `Location: ${data.location}`;
        document.getElementById('temp').innerHTML = `Temperature: ${data.temperature}`;
        document.getElementById('content').innerHTML = `Feeling: ${data.userResponse}`;
    } catch(error){
        alert("error" + error);
        console.log("error", error);
    }
}
