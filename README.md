# Social-Network

## Local Installation

#### Backend Installation
From the Project root directory, please run `npm install` to install the dependancies for this project. 

#### Front-End Installation
From the project root, run this npm script `npm run dep-install`. If this fails for whatever reason, you can install the dependancies manuall by completing the following.

Please run the following command to install the front end dependancies from the project root directory. `````cd client && npm install````` 

When the dependancies have installed you're able to run the server locally by running `````npm run server````` we are leveraging nodemon here to keep the server running with change tracking and hot-reloading as well as concurrently to do the same for the front-end react application

### Running the Application locally
To use a local dev server, after you've completed the dependancy installation, run this npm command. `````npm run dev`````
You will need a config directory, and generate a file called `````keys.js````` and you'll need to link off to a mongoose database using a connection string. You also need to generate a secret string. The file should look like this.

        module.exports = {
          url: 'Your Mongoose connection string',
          secret: 'Your Secret String'
        }

## Heroku Deployment
When the time comes to fire up your application. You will need to set the following

1. Ensure you have no devDependancies in either `package.json`.
2. Ensure that your `store.js` has removed this line `window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),` otherwise browsers without the extensions installed will not be able to render the page.