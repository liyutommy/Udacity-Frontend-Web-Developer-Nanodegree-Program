/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=78cb289771c95e27ca808f0c228bf6c2&units=imperial';

// Click event trigers getWeather function
document.getElementById('generate').addEventListener('click', getWeather);

// Procedure: getWeatherData => postData => updateUI
async function getWeather() {
  // Get user's inputs
  const zipCode = document.getElementById('zip').value;
  const countryCode = document.getElementById('country').value;

  getWeatherData(baseURL, zipCode, countryCode, apiKey)
    .then((weatherData) => { // WeatherData is the return value from getWeatherData function
      console.log(weatherData);
      // Get date and feelings entered from users
      const d = new Date();
      const newDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
      const feelings = document.getElementById('feelings').value || 'Nice!';
      console.log(newDate, feelings);
      // Construct a data object 
      const dataObj = {
        temperature: weatherData.main.temp,
        location: `${weatherData.name}, ${weatherData.sys.country}`,
        date: newDate,
        weather: weatherData.weather[0].description,
        userResponse: feelings,
      }
      // Pass the data object to the url /addWeather in server side
      postData('/addWeather', dataObj);
    }).then(
      // Server has already save the data object
      // We can directly use the data from server to update the UI 
      () => {
        // Update DOM element to tell user the weather data
        updateUI();
      }
    )
}

const getWeatherData = async (baseURL, zip, country, key) => {
  // Check if the length of zip code and country code is correct
  if (zip.length != 5) {
    alert("The length of zip code should be 5!");
    return;
  }
  if (country.length != 2) {
    alert("The length of country code should be 2!");
    return;
  }

  // Example URL: api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
  const url = `${baseURL}${zip},${country}${key}`;
  // Get weather data
  const response = await fetch(url);
  console.log(response);
  try {
    // response.json() returns a promise that resolves to a JS object
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
}

const postData = async (url = '', postData = {}) => {
  console.log(postData);
  // Init: An object containing any custom settings that you want to apply to the request
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });
  console.log(response);
  try {
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
}

const updateUI = async () => {
  const response = await fetch("/all");
  console.log(response);
  try {
    const data = await response.json();
    console.log(data);
    document.getElementById('date').innerHTML = `Date: ${data.date}`;
    document.getElementById('loca').innerHTML = `Location: ${data.location}`;
    document.getElementById('temp').innerHTML = `Temperature: ${data.temperature} °F`;
    document.getElementById('weather').innerHTML = `Weather: ${data.weather}`;
    document.getElementById('content').innerHTML = `Feeling: ${data.userResponse}`;
  } catch (error) {
    alert("error" + error);
    console.log("error", error);
  }
}
