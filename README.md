# What is MERN?

MERN stands for MongoDB, Express, React, Node
Classified as a NoSQL database program, MongoDB uses JSON-like documents.
Express.js, or simply Express, is a back end web application framework for building RESTful APIs with Node.js
Node.js is a back-end JavaScript runtime environment. Node.js runs on a JavaScript Engine and executes JavaScript code outside a web browser.
React is a free and open-source front-end JavaScript library for building user interfaces based on UI components.

# Structure

## Server

The package.json file is the heart of any Node project. It records important metadata about a project which is required before publishing to NPM, and also defines functional attributes of a project that npm uses to install dependencies, run scripts, and identify the entry point to our package.

In this file we defined how to start the app, meaning what happens when we run 'npm start' or 'npm run server'.

package-lock.json is automatically generated for any operations where npm modifies either the node_modules tree, or package.json.

The server.js is run to start the server.

The node_modules is just a directory created by npm and a way of tracking each packages you install locally via package.json

### DB

The db folder contains the code to connect to the MongoDB database with mongoose
The URL of the db is stored in the .env file

### Models

Models are responsible for creating and reading documents from the underlying MongoDB database.
We have one file per 'class' or 'collection' or 'table', for example User

### Routes

Routing refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, and so on).

Each route can have one or more handler functions, which are executed when the route is matched.

We have one file per type of objects (an endpoint), in which we define which endpoints and methods (get, post, etc.). We define which function is used for each method. The functions are defined in the Controllers folder.

### Controllers

We have one file per route, we import the Model and perform the operations we want for the methods for each endpoint.
For example, to sign up a new user we use the '/register' route and the post method. we check if a user already exists with the email and if not we create it (using the Model).

###
