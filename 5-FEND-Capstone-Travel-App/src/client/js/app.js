// Global Variables
const travelInfoData = {};
const geoNameBaseURL = 'http://api.geonames.org/searchJSON?';
const username = 'liyutommy';
const weatherbitBaseURL = 'https://api.weatherbit.io/v2.0/forecast/daily?';
const weatherbitAPIKey = '46a9373f055b4d66a7e0eec0824d52a1';
const pixabayBaseURL = 'https://pixabay.com/api/?';
const pixabayAPIKey = '22770684-c8dae18a87b4189d2d15c5173';


// Helper functions
// check if input is empty or short
const checkInput = (input) => {
    if (input.length < 2) {
        alert("The input is too short or empty!");
        return false;
    } else {
        return true;
    }
}

// remove charactres except 26 letters
const removeOp = (input) => {
    let s = input.replace(/[^a-zA-Z ]+/g, '');
    return s;
}

// calculate difference between two dates
const dateDifference = (date2, date1) => {
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

// get departure date's temperature and weather description
const getTempDesc = (data) => {
    // calculate how many days away from today
    const today = new Date();
    const departureDate = new Date(travelInfoData.date);
    const diffDays = dateDifference(departureDate, today);
    // if date difference greater than 16, the weather info is unknown 
    if (diffDays > 16) {
        alert('The departure date is more than 16 days away from today, so the relevant weather forecast cannot be obtained');
    }
    const temperature = (diffDays <= 16) ? data.data[diffDays - 1].temp : "Unknown";
    const description = (diffDays <= 16) ? data.data[diffDays - 1].weather.description : "Unknown";
    travelInfoData.temp = temperature;
    travelInfoData.desc = description;
    travelInfoData.city = data.city_name;
}

// captalize first letters of all words
function capAllLetters(s) {
    return s.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

// add event listeners when DOM is loaded completely
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('save').addEventListener('click', handleSave);
    document.getElementById('remove').addEventListener('click', handleRemove);
});

// handle the "save trip" button event
function handleSave(event) {
    event.preventDefault();

    // save value first
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;

    // reset the form
    handleRemove(event);


    if (checkInput(origin) && checkInput(destination) && checkInput(date)) {

        travelInfoData.orig = capAllLetters(removeOp(origin));
        travelInfoData.dest = capAllLetters(removeOp(destination));
        travelInfoData.date = date;

        getGeoName(travelInfoData.dest)
            .then(() => getWeatherbit(travelInfoData.lat, travelInfoData.lng))
            .then(() => getPixabay(travelInfoData.city))
            .then(() => postData('/postTraveInfo', travelInfoData))
            .then(() => updateUI());

    }
}

// obtain destination's longitude and latitude 
const getGeoName = async (dest) => {
    const urlGeoName = `${geoNameBaseURL}name_equals=${dest}&username=${username}`;
    const resGeoName = await fetch(urlGeoName);
    try {
        const dataGeoName = await resGeoName.json();
        // error handling
        if (dataGeoName.totalResultsCount) {
            const geoNameData = dataGeoName['geonames'][0];
            travelInfoData.lat = geoNameData.lat;
            travelInfoData.lng = geoNameData.lng;
        } else {
            alert("Please enter a city name exactly!")
            travelInfoData.lat = "";
            travelInfoData.lng = "";
        }
        console.log("Geoname:", travelInfoData);
        return travelInfoData;
    } catch (err) {
        console.log("error", err);
    }
}

// obtain destination's 16-day weather forecast
const getWeatherbit = async (lat, lng) => {
    const urlWeatherbit = `${weatherbitBaseURL}lat=${lat}&lon=${lng}&key=${weatherbitAPIKey}`;
    const resWeatherbit = await fetch(urlWeatherbit);
    try {
        const dataWeatherbit = await resWeatherbit.json();
        getTempDesc(dataWeatherbit);
        console.log("weatherbit:", travelInfoData);
    } catch (err) {
        console.log("error", err);
    }
}

// obtain destination's image URL
const getPixabay = async (city) => {
    const urlPixabay = `${pixabayBaseURL}q=${city} city&image_type=photo&pretty&key=${pixabayAPIKey}`;
    const resPixabay = await fetch(urlPixabay);
    try {
        const dataPixabay = await resPixabay.json();
        // error handling
        if (dataPixabay.totalHits) {
            travelInfoData.image = dataPixabay.hits[0].webformatURL;
            console.log("pixabay:", travelInfoData);
        } else {
            alert("Please enter a city name exactly!")
            travelInfoData.image = "";
        }
    } catch (err) {
        console.log("error", err);
    }
}

// store travelInfoData to the server side
const postData = async (url = '', postData = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    });
    try {
        const data = await response.json();
        return data;
    } catch (err) {
        console.log("error", err);
    }
}

// update UI elements and hidden 'travel info' section
const updateUI = async () => {
    const response = await fetch('/projectData');
    try {
        const data = await response.json();
        console.log(data);
        document.getElementById('departure-date').innerHTML = travelInfoData.date;
        document.getElementById('orig').innerHTML = travelInfoData.orig;
        document.getElementById('dest').innerHTML = travelInfoData.dest;
        document.getElementById('temp').innerHTML = travelInfoData.temp;
        document.getElementById('weather').innerHTML = travelInfoData.desc;
        document.getElementById('figcaption').innerHTML = travelInfoData.city;
        document.getElementById('place-name').setAttribute('src', travelInfoData.image);
        document.getElementById('place-name').setAttribute('alt', travelInfoData.city);
        document.getElementById('trave-result').classList.remove('hidden');
    } catch (err) {
        console.log("error", err);
    }
}

// handle the "remove trip" button event
function handleRemove(event) {
    event.preventDefault();
    document.getElementById('trave-plan-form').reset();
    document.getElementById('trave-result').classList.add('hidden');
}


export {
    removeOp,
    dateDifference,
    getGeoName,
    getWeatherbit,
    getPixabay,
    postData,
    handleSave,
    handleRemove
}