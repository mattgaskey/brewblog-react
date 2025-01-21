# BrewBlog React Frontend

A React frontend for the [BrewBlog](https://github.com/mattgaskey/brewblog-api) API backend.  Provides component-based single-page app with routing and external authentication via Auth0.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)

## Features

- User authentication with Auth0
- Profile management
- Integration with BrewBlog API backend
- Responsive design
- Code snippets display

## Installation

To get started with the project, clone the repository and install the dependencies:

```sh
git clone https://github.com/mattgaskey/brewblog-react.git
cd brewblog-react
npm install
```

## Configuration

Create a .env file in the root directory and add the following environment variables:

```sh
REACT_APP_API_SERVER_URL=<your-api-server-url>
REACT_APP_AUTH0_DOMAIN=<your-auth0-domain>
REACT_APP_AUTH0_CLIENT_ID=<your-auth0-client-id>
REACT_APP_AUTH0_CALLBACK_URL=<your-auth0-callback-url>
REACT_APP_AUTH0_AUDIENCE=<your-auth0-audience>
SQLALCHEMY_DATABASE_URI=<your-database-uri>
```

## Available Scripts

In the project directory, you can run:

`npm start`

Runs the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

`npm test`

Launches the test runner in interactive watch mode.
See the section about running tests for more information.

`npm run build`

Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

`npm run eject`

Note: this is a one-way operation. Once you eject, you can’t go back!

If you aren’t satisfied with the build tool and configuration choices, you can eject at any time. This command will remove the single build dependency from your project.

## Deployment

To deploy the application, build the project and deploy the contents of the build folder to your preferred hosting service.

```sh
npm run build
```

