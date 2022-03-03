# Checkly Website

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 1. Scripts

In the project directory `cd checkly-website`, you can run:

### `npm start`

Runs the app in the development mode - what we will be doing.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

> **Note:** We will not likely be needing this since we are hosting on firebase. And it preforms the deployment as a workflow.


### `npm install`

Installs the library and updates `package.json`

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.


--- 
## 2. Enviroment and Firebase Configuration

To ensure our application credential's security I have created a `.env` which i will refrence in the firebase configuration. It has been addedd to `.gitignore`, meaning your project will not run unless you configure it and add it. 

### Follow the steps below:

1. Add a `.env` file in your src directory
2. Paste the configuration details inside it:
   ``` c
    REACT_APP_FIREBASE_API_KEY = "",
    REACT_APP_FIREBASE_AUTH_DOMAIN = "",
    REACT_APP_FIREBASE_PROJECT_ID = "",
    REACT_APP_FIREBASE_STORAGE_BUCKET = "",
    REACT_APP_FIREBASE_SDATABASE_URL = "",
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID = "",
    REACT_APP_FIREBASE_APP_ID= "",
    REACT_APP_FIREBASE_MEASUREMENT_ID= ""
   ```
3. Run `npm start` to make sure the setup is correct   

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
