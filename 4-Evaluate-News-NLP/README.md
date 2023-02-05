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



## How to run 

1. `npm install` (npm - version 16.16.0)
2. Development: `npm run build-dev`
3. Production: `npm run build-prod`
4. Start the program: `npm start`
5. Test the program: `npm test`



### Stage 1 - Getting Started - Setting up the Project

It would be good to first get your basic project up and functioning. Fork the project Github repo, and then clone or download the zip file locally.

**Note:** Don't forget to fork the repo and then clone the branch "refresh-2019".

Remember that once you clone, you will still need to install everything:

```
cd <project directory>
npm install
```

Follow the steps from the course up to Lesson 4, but ***do not add Service Workers just yet\***. We won't need the service workers during *development*, and having extra caches floating around just means there's more potential for confusion.

For reference, here is a brief summary of the steps that you need to follow from the course up to Lesson 4.

1. After `npm install`, verify if both `webpack.dev.js` and `webpack.prod.js` files have

   ```js
   const path = require("path") 
   const webpack = require("webpack") 
   module.exports = { }
   ```

   Your Webpack installation must be completed by now.

2. Verify, if both the Webpack config files have an entry point:

   ```js
   module.exports = 
   { 
   entry: './src/client/index.js' 
   }
   ```

   Note: 

   There should be an index.js file in the client folder, if it’s not there you need to create it and add an alert: alert("I EXIST").

3. Now, that the Webpack entry is decided, you need to have babel installed: `npm i -D @babel/core@^7.5.4 @babel/preset-env@^7.5.4 babel-loader@^8.0.6`.

4. Verify if the .babelrc file has:

   ```js
   {
   'presets': ['@babel/preset-env']
   }
   ```

5. Both Webpack config files should have the test for babel-loader. **Note:** Remove quotes from /.js if they are present here.

6. In the client/index.js file make imports for `checkForName` and `handleSubmit`, if they are not present. Don't forget to export these js files.

7. Now let us move to plugins, install the HTML plugin `npm i -D html-webpack-plugin@^3.2.0`.

8. We need to add the `require` at the top of your Webpack config files

   ```js
   const HtmlWebPackPlugin = require(‘html-webpack-plugin’)
   ```

9. Add a plugins list to the Webpack config and instantiate the plugin

   ```js
   plugins: [
     new HtmlWebPackPlugin({
     template: "./src/client/views/index.html",
     filename: "./index.html",
     })
   ]
   ```

10. Update your server file. Change the home route to use the index file from dist:

    ```js
    app.get('/', function (req, res) {
    	res.sendFile('dist/index.html')
    })
    ```

11. Update `app.use(express.static('src/client'))` to `app.use(express.static('dist'))`.

12. Verify if the `mode` is present in both dev and prod files.

13. Let’s install the clean webpack plugin: `npm i -D clean-webpack-plugin@^3.0.0` and add this new plugin to the plugin array as discussed earlier in plugins lessons.

14. Rename all the `.css` files in client/styles to `.scss`.

15. Install the sass loaders `npm i -D style-loader@^0.23.1 node-sass@^4.14.1 css-loader@^3.6.0 sass-loader@^7.3.1`.

16. Add the test case to the rule in webpack.dev.js and prod:

    ```js
    {
      test: /.scss$/,
      use: [ 'style-loader', 'css-loader', 'sass-loader' ]
    }
    ```

17. Now, we can import the scss files like this in client/index.js:

    ```js
    import './styles/resets.scss'
    import './styles/base.scss'
    import './styles/footer.scss'
    import './styles/form.scss'
    import './styles/header.scss'
    ```

Just for your quick reference, we installed the following loaders and plugins so far:

```js
# Choose the necessary installation for your development mode
npm i -D @babel/core @babel/preset-env babel-loader
npm i -D style-loader node-sass css-loader sass-loader
npm i -D clean-webpack-plugin
npm i -D html-webpack-plugin
npm i -D mini-css-extract-plugin
npm i -D optimize-css-assets-webpack-plugin terser-webpack-plugin
```

*Note: If you are facing package compatibility issues, here is a proposed set of packages with their versions. These versions are compatible with each other.*

```js
"dependencies": {
"dotenv": "^8.2.0",
"express": "^4.17.1",
"jest-fetch-mock": "^3.0.3",
"webpack": "^4.35.3",
"webpack-cli": "^3.3.5"
},
"devDependencies": {
"@babel/core": "^7.13.15",
"@babel/plugin-transform-modules-commonjs": "^7.13.8",
"@babel/preset-env": "^7.13.15",
"babel-loader": "^8.2.2",
"body-parser": "^1.19.0",
"clean-webpack-plugin": "^3.0.0",
"cors": "^2.8.5",
"css-loader": "^5.2.1",
"html-webpack-plugin": "^3.2.0",
"jest": "^26.6.3",
"mini-css-extract-plugin": "^1.4.1",
"node-fetch": "^2.6.1",
"node-sass": "^5.0.0",
"optimize-css-assets-webpack-plugin": "^5.0.4",
"sass": "^1.32.8",
"sass-loader": "^10.1.1",
"style-loader": "^2.0.0",
"terser-webpack-plugin": "^5.1.1",
"webpack-dev-server": "^3.11.2",
"workbox-webpack-plugin": "^6.1.5"
}
```

*As these versions are not the latest versions, make sure to install them with:*

```bash
npm i --legacy-peer-deps
```



### Stage 2 - Setting up the API

using the MeaningCloud Sentiment Analysis API for this project.

#### Step 1: Sign up for an API key

**For the MeaningCloud API**: You can find the API [here](https://www.meaningcloud.com/developer/sentiment-analysis). Once you create an account with MeaningCloud, you will be given a license key to start using the API. This API does not require an SDK, so you can skip ahead to step 4 in the instructions.

#### Step 2: Environment Variables

1. Use npm to install the dotenv package - `npm install dotenv` This will allow us to use environment variables we set in a new file

2. Create a new `.env` file in the root of your project.

3. Fill the `.env` file with your API keys like this:

   ```
   API_KEY=**************************
   ```

4. Add this code to the very top of your `server/index.js` file:

   ```js
   const dotenv = require('dotenv');
   dotenv.config();
   ```

5. If you want to refer the environment variables, try putting a prefix `process.env.` in front of the variable name in the `server/index.js` file, an example might look like this:

   ```js
   console.log(`Your API key is ${process.env.API_KEY}`);
   ```

6. Go to your `.gitignore` file, in the project root, and add `.env`. It will make sure that we don't push our environment variables to Github! If you forget this step, all of the work we did to protect our API keys would become pointless.

#### Step 3: Using the API

You can also check out the documentation of the MeaningCloud API [here](https://www.meaningcloud.com/developer/sentiment-analysis/doc/2.1). MeaningCloud also has several other APIs, which we won’t be using for this project, but feel free to take a look around if you’re curious!



### Stage 3 - Project Enhancement

At the current stage, make enhancement in your project code to ensure most of the requirements as mentioned in the [project rubric](https://review.udacity.com/#!/rubrics/4866/view) are met. In addition, parse the response body to dynamically fill content on the page.

Only the rubric requirements related to "Offline Functionality" and "Testing" criteria should remain for the next stages.



### Stage 4 - Unit Testing using Jest Framework

You must have read the rubric item for "Testing" criteria, that says:

> Check that the project has Jest installed, that there is an npm script to run Jest, and that the tests all pass. Every src/client/js file should have at least one test.

[Jest](https://jestjs.io/en/) is a framework for testing JavaScript projects. We are interested in the unit-testing of our project. The Jest framework provides us the ability to create, and run unit tests. In general, unit testing means to test the functionality of each unit/component of a project. But, in our case, we will write tests for desired functions defined in the src/client/js directory. The tests will check if the functions are behaving expectedly when provided an input. Let's learn to add Jest to your project to handle unit-testing.

### How does it work?

1. Install Jest by using `npm install --save-dev jest`

2. Write the custom JS in your src/client/js directory, responsible for the server, and form submission task. For example, assume that the`/src/client/js/formHandler.js` file has the following function to be tested:

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

3. You have to ensure that all your custom functions in src/client/js directory can handle error responses if the user input does not match API requirements. You will write tests in `<function_name>.test.js` or `<function_name>.spec.js` file, to be present in a `__test__` folder. For each functionality, consider writing a separate test file. The `__test__` folder should be present in the project directory. In each test file, the general flow of the test block should be:

   - Import the js file to test

   - Define the input for the function. Note that, to keep it simple, we will not validate the input being provided to the test cases.

   - Define the expected output

   - Check if the function produces the expected output For the example function shown above, `/src/client/js/formHandler/handleSubmit()`, you can write a test file `testFormHandler.spec.js` in the `__test__` directory, having a test block as:

     ```js
     // Import the js file to test
     import { handleSubmit } from "../src/client/js/formHandler"
     ```

     ```js
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

     You must be wondering about the matchers, and other syntactical information about test blocks. At this point, you must refer to the external resources:

   - [Jest - Getting started](https://jestjs.io/docs/en/getting-started) - Provides a basic overview, with the help of an example.

   - [Jest - matchers](https://jestjs.io/docs/en/using-matchers) - Read carefully to identify the suitable matcher for each of your functions.

   - [Jest - testing asynchronous code](https://jestjs.io/docs/en/asynchronous) - If you have code that runs asynchronously.

   - [A tutorial for beginners](https://www.valentinog.com/blog/jest/) - A good explanatory tutorial.

4. Configure an npm script named "test" in `package.json` to run your tests from the command line:

```js
"scripts": {
"test": "jest"
}
```

Also, ensure that the "devDependencies" in `package.json` have a suitable entry for Jest and others, such as, `"jest": "^25.3.0",`, where the version may vary with time.

1. Run the `npm run test` command.
2. **Important:** Verify that every src/client/js file should have at least one test, and all tests have passed to pass this rubric point.

### Stage 5 - Service Workers

The rubric item for "Offline Functionality" criteria says:

> The project must have set up service workers in webpack.

Go to the webpack config file, and add the setup for service workers.  Test that the site should be available even when you stop your local server .

### Stage 6 - Deployment

A great step to take with your finished project would be to deploy it! Unfortunately its a bit out of scope for me to explain too much about how to do that here, but check out [Netlify](https://www.netlify.com/) or [Heroku](https://www.heroku.com/) for some really intuitive free hosting options.

