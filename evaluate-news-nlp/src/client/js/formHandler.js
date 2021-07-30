import fetch from 'node-fetch';

function handleSubmit(event) {
    event.preventDefault();

    // check what text was put into the form field
    let formText = document.getElementById('name').value;

    Client.checkForName(formText)

    console.log("::: Form Submitted :::")

    /*
    fetch('http://localhost:8081/test')
    .then(res => res.json())
    .then(function(res) {
        console.log(res)
        document.getElementById('results').innerHTML = res.message
    })
    */
    const dataObj = {
        text: formText
    };
    postData('/textAnalysis', dataObj)
    .then(() => updateUI());
    
}


const postData = async (url='', postData={}) => {
    console.log(postData);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    });
    try{
        const data = await response.json();
        console.log(data);
        return data;
    } catch(err){
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
    try{
        const data = await response.json();
        document.getElementById('score').innerHTML = `Sentiment Score: ${results.score_tag[data.score_tag]}`;
        document.getElementById('subject').innerHTML = `Subjectivity: ${results.subjectivity[data.subjectivity]}`;
        document.getElementById('confidence').innerHTML = `Confidence: ${data.confidence}`;
        document.getElementById('irony').innerHTML = `Irony: ${results.irony[data.irony]}`;
    } catch(err){
        console.log("error", err);
    }

}


export { handleSubmit, postData }

