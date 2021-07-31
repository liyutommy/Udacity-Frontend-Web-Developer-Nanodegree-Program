# Sentiment Analyzer

## Project Overview

We will build a web tool that allows users to run Natural Language Processing (NLP) on articles or blogs found on other websites. NLP is the ability of an application to understand the human language, written or oral.

- Webserver - Node
- Web application framework for routing - Express
- Build tool - Webpack. Using webpack, we will set up the app to have dev and prod environments, each with their own set of tools and commands.
- External script - Service Worker
- External API - MeaningCloud

## Project Instructions

The goal of this project is to give you practice with:
- Setting up Webpack
- Sass styles
- Webpack Loaders and Plugins
- Creating layouts and page design
- Service workers
- Using APIs and creating requests to external urls

### Stage 1 - Getting Started - Setting up the Project

Once we cloned the folder, we will still need to install everything:

`cd` into our new folder and run:
- `npm install`

## Stage 2 - Setting up the API

- Sign up an account for meaningCloud API and get its API key
- Create a .env folder to store the API key
- Notice:
  - we need to use dotenv dependency to acess the key
  ```js
  const dotenv = require('dotenv');
  dotenv.config();
  console.log(`Your API key is ${process.env.API_KEY}`);
  ```

### Stage 3 - Project Enhancement
At the current stage, make enhancement in our project code to ensure most of the requirements as mentioned in the project rubric are met. In addition, parse the response body to dynamically fill content on the page.

**Rubric:**

- Update README and .gitignore
- Set up webpack development environment (both dev and prod)
- The app should make a successful call to the api on form submission
- Set up service workers
- Use jest to test most of JS functions
- Attempt to validate the input URL


Only the rubric requirements related to "Offline Functionality" and "Testing" criteria should remain for the next stages.

### Stage 4 - Unit Testing using Jest Framework

- Jest is a framework for testing JavaScript projects.
- We need to write tests in <function_name>.test.js or <function_name>.spec.js file, to be present in a __test__ folder. For each functionality, consider writing a separate test file. The __test__ folder should be present in the project directory.
- Notice: configure an npm script named "test" in package.json to run our tests from the command line:
```js
"scripts": {
    "test": "jest"
}
```
Also, ensure that the "devDependencies" in package.json have a suitable entry for Jest and others, such as, "jest": "^25.3.0",, where the version may vary with time. Finally, run the ```npm run test``` command.

### Stage 5 - Service Workers (WorkboxPlugin)

Service Workers plugin makes app available even when we stop our local server.

### Stage 6 - Deployment

Deploy the app on [Netlify](https://www.netlify.com/) or [Heroku](https://www.heroku.com/) 
