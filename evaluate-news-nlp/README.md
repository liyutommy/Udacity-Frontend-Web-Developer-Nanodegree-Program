# Sentiment Analyzer

## Project Overview

We will build a web tool that allows users to run Natural Language Processing (NLP) on articles or blogs found on other websites. NLP is the ability of an application to understand the human language, written or oral.

- Webserver - Node
- Web application framework for routing - Express
- Build tool - Webpack. Using webpack, we will set up the app to have dev and prod environments, each with their own set of tools and commands.
- External script - Service Worker
- External API - MeaningCloud

## Project Instructions

This repo is your starter code for the project. It is the same as the starter code we began with in lesson 2. Install and configure Webpack just as we did in the course. Feel free to refer to the course repo as you build this one, and remember to make frequent commits and to create and merge branches as necessary!

The goal of this project is to give you practice with:
- Setting up Webpack
- Sass styles
- Webpack Loaders and Plugins
- Creating layouts and page design
- Service workers
- Using APIs and creating requests to external urls

On top of that, I want to introduce you to the topic of Natural Language Processing. NLPs leverage machine learning and deep learning create a program that can interpret natural human speech. Systems like Alexa, Google Assistant, and many voice interaction programs are well known to us, but understanding human speech is an incredibly difficult task and requires a lot of resources to achieve. Full disclosure, this is the Wikipedia definition, but I found it to be a clear one:

> Natural language processing (NLP) is a subfield of computer science, information engineering, and artificial intelligence
concerned with the interactions between computers and human (natural) languages, in particular how to program computers to
process and analyze large amounts of natural language data.

You could spend years and get a masters degree focusing on the details of creating NLP systems and algorithms. Typically, NLP programs require far more resources than individuals have access to, but a fairly new API called Aylien has put a public facing API in front of their NLP system. We will use it in this project to determine various attributes of an article or blog post.

### Stage 1 - Getting Started - Setting up the Project

It would probably be good to first get your basic project setup and functioning. Follow the steps from the course up to Lesson 4 but don't add Service Workers just yet. We won't need the service workers during development and having extra caches floating around just means there's more potential for confusion. So, fork this repo and begin your project setup.

Remember that once you clone, you will still need to install everything:

`cd` into your new folder and run:
- `npm install`

## Stage 2 - Setting up the API

you will be using the MeaningCloud Sentiment Analysis API for this project.

#### Step 1: Signup for an API key

For the MeaningCloud API: You can find the API here. Once you create an account with MeaningCloud, you will be given a license key to start using the API. This API does not require an SDK, so you can skip ahead to step 4 in the instructions.

####  Step 4: Environment Variables
Next, in server/index.js, you need to declare your API credentials, which will look something like this:

```js
// You could call it aylienapi, or anything else
var textapi = new aylien({
  application_id: "your-api-id",
  application_key: "your-key"
});
```
If you are using the MeaningCloud API, the process will look pretty similar to the Aylien API process, but you don’t need to use an application_id.

But there's a problem with this. We are about to put our personal API keys into a file, but when we push, this file is going to be available PUBLICLY on Github. Private keys, visible publicly are never a good thing. So, we have to figure out a way to make that not happen. The way we will do that is with environment variables. Environment variables are pretty much like normal variables in that they have a name and hold a value, but these variables only belong to your system and won't be visible when you push to a different environment like Github.

1. Use npm or yarn to install the dotenv package ```npm install dotenv```. This will allow us to use environment variables we set in a new file
2.  Create a new ```.env``` file in the root of your project
3.  Go to your .gitignore file and add ```.env``` - this will make sure that we don't push our environment variables to Github! If you forget this step, all of the work we did to protect our API keys was pointless.
4.  Fill the .env file with your API keys like this:
```js
API_ID=**************************
API_KEY=**************************
```
5. Add this code to the very top of your server/index.js file:
```js
const dotenv = require('dotenv');
dotenv.config();
```
6. Reference variables you created in the .env file by putting ```process.env``` in front of it, an example might look like this:
```js
console.log(`Your API key is ${process.env.API_KEY}`);
```
Not that you would want to do that. This means that our updated API credential settings will look like this:
```javascript
// set aylien API credentials
// NOTICE that textapi is the name I used, but it is arbitrary. 
// You could call it aylienapi, nlp, or anything else, 
//   just make sure to make that change universally!
var textapi = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});
```

#### Step 5: Using the API

You can see how using the SDK simplifies the requests we need to make. You can also check out the documentation of the MeaningCloud API here. MeaningCloud also has several other APIs, which we won’t be using for this project, but feel free to take a look around if you’re curious!.

### Stage 3 - Project Enhancement
At the current stage, make enhancement in your project code to ensure most of the requirements as mentioned in the project rubric are met. In addition, parse the response body to dynamically fill content on the page.

Only the rubric requirements related to "Offline Functionality" and "Testing" criteria should remain for the next stages.

### Stage 4 - Unit Testing using Jest Framework

Jest is a framework for testing JavaScript projects. We are interested in the unit-testing of our project. The Jest framework provides us the ability to create, and run unit tests. In general, unit testing means to test the functionality of each unit/component of a project. But, in our case, we will write tests for desired functions defined in the src/client/js directory. The tests will check if the functions are behaving expectedly when provided an input. Let's learn to add Jest to your project to handle unit-testing.

1. Install Jest by using ```npm install --save-dev jest```
2. Write the custom JS in your src/client/js directory, responsible for the server, and form submission task. For example, assume that the /src/client/js/formHandler.js file has the following function to be tested:
```js
function handleSubmit(event) {
    event.preventDefault()
    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)
    console.log("::: Form Submitted :::")
}
export { handleSubmit }
```
3. You have to ensure that all your custom functions in src/client/js directory can handle error responses if the user input does not match API requirements. You will write tests in <function_name>.test.js or <function_name>.spec.js file, to be present in a __test__ folder. For each functionality, consider writing a separate test file. The __test__ folder should be present in the project directory.

In each test file, the general flow of the test block should be:

- Import the js file to test
- Define the input for the function. Note that, to keep it simple, we will not validate the input being provided to the test cases.
- Define the expected output
- Check if the function produces the expected output

For the example function shown above, /src/client/js/formHandler/handleSubmit(), you can write a test file testFormHandler.spec.js in the __test__ directory, having a test block as:
```js
// Import the js file to test
import { handleSubmit } from "../src/client/js/formHandler"
// The describe() function takes two arguments - a string description, and a test suite as a callback function.  
// A test suite may contain one or more related tests    
describe("Testing the submit functionality", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the handleSubmit() function", () => {
           // Define the input for the function, if any, in the form of variables/array
           // Define the expected output, if any, in the form of variables/array
           // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
           // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher
           expect(handleSubmit).toBeDefined();
})});
```
4. Configure an npm script named "test" in package.json to run your tests from the command line:
```js
"scripts": {
    "test": "jest"
}
```
Also, ensure that the "devDependencies" in package.json have a suitable entry for Jest and others, such as, "jest": "^25.3.0",, where the version may vary with time.
5. Run the ```npm run test``` command.

### Stage 5 - Service Workers

The rubric item for "Offline Functionality" criteria says:

> The project must have set up service workers in webpack.

Go to the webpack config file, and add the setup for service workers.  Test that the site should be available even when you stop your local server.

### Stage 6 - Deployment
A great step to take with your finished project would be to deploy it! Unfortunately its a bit out of scope for me to explain too much about how to do that here, but checkout [Netlify](https://www.netlify.com/) or [Heroku](https://www.heroku.com/) for some really intuitive free hosting options.
