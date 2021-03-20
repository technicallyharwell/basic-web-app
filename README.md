# basic-web-app
A simple web app with stack: Node.js, Express, MongoDB

## Installation
### Node.js
Download from: https://nodejs.org/en/ 
At the time of writing, the current LTS release of Node.js is v14.16.0

### express-generator
After successful installation of Node.js, open a terminal/command prompt and execute command: `npm install -g express-generator` . NOTE: -g flag installs the package globally, adding to the system path.

### EJS
Navigate to the directory where the project will live, and execute the following command: `express --view="ejs" nodetest1` . NOTE: nodetest1 can be named whatever you choose

### Monk & MongoDB
Execute command `npm install --save monk@^7.1.2 mongodb@^3.5.4` . Checking the generated file `package.json` should confirm the dependencies have been installed and added to the project.

### Everything else
Execute command `npm install` to install all other dependencies for the project (dependencies are determined from the `package.json` file)

