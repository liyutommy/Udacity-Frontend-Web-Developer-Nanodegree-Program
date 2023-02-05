import fetch from 'node-fetch';

function isValidURL(string) {
    const regex = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return regex.test(string);
}

function handleSubmit(event) {
    event.preventDefault();

    // check what text was put into the form field
    let formText = document.getElementById('name').value;

    Client.checkForName(formText)

    console.log("::: Form Submitted :::");

    // check is the url is valid
    if (isValidURL(formText)) {
        console.log("valid url");
        const dataObj = {
            text: formText
        };
        // apply the API to analyze webpage
        postData('/textAnalysis', dataObj)
            // use the data from API to upate webpage 
            .then(() => updateUI());
    } else {
        alert('The input URL is not valid!!')
        return;
    }
}


const postData = async (url = '', postData = {}) => {
    console.log(postData);
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
        console.log(data);
        return data;
    } catch (err) {
        console.log("error", err);
    }
}

const results = {
    'score_tag': {
        'P+': 'Strong positive',
        'P': 'Positive',
        'NEU': 'Neutral',
        'N': 'Negative',
        'N+': 'Strong negative',
        'NONE': 'Without polarity'
    },
    'subjectivity': {
        'OBJECTIVE': 'The text does not have any subjectivity marks.',
        'SUBJECTIVE': 'The text has subjective marks.'
    },
    'irony': {
        'NONIRONIC': 'The text does not have any irony marks.',
        'IRONIC': 'The text has irony marks.'
    }
}

const updateUI = async () => {
    const response = await fetch('/results');
    console.log(response);
    try {
        const data = await response.json();
        document.getElementById('score').innerHTML = `Sentiment Score: ${results.score_tag[data.score_tag]}`;
        document.getElementById('subject').innerHTML = `Subjectivity: ${results.subjectivity[data.subjectivity]}`;
        document.getElementById('confidence').innerHTML = `Confidence: ${data.confidence}`;
        document.getElementById('irony').innerHTML = `Irony: ${results.irony[data.irony]}`;
    } catch (err) {
        console.log("error", err);
    }

}


module.exports = { handleSubmit, postData, isValidURL }

