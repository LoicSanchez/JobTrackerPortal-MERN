# What is MERN?

MERN stands for MongoDB, Express, React, Node.

Classified as a NoSQL database program, MongoDB uses JSON-like documents.

Express.js, or simply Express, is a back end web application framework for building RESTful APIs with Node.js.

Node.js is a back-end JavaScript runtime environment. Node.js runs on a JavaScript Engine and executes JavaScript code outside a web browser.

React is a free and open-source front-end JavaScript library for building user interfaces based on UI components.

# Structure

## Server

The package.json file is the heart of any Node project. It records important metadata about a project which is required before publishing to NPM, and also defines functional attributes of a project that npm uses to install dependencies, run scripts, and identify the entry point to our package.

In this file we defined how to start the app, meaning what happens when we run 'npm start' or 'npm run server'.

package-lock.json is automatically generated for any operations where npm modifies either the node_modules tree, or package.json.

The server.js is run to start the server.

The node_modules is just a directory created by npm and a way of tracking each packages you install locally via package.json.

We use JWT, or JSON Web Token (an open standard used to share information between two parties securely — a client and a server) and password encryption.

We test the Server with logs on the Terminal and POSTMAN, as there is no front-end to the server. The Font-End (client) is connected to the server to make our app complete.

### DB

The db folder contains the code to connect to the MongoDB database with mongoose.

The URL of the db is stored in the .env file.

### Models

Models are responsible for creating and reading documents from the underlying MongoDB database.
We have one file per 'class' or 'collection' or 'table', for example User

### Routes

Routing refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, and so on).

Each route can have one or more handler functions, which are executed when the route is matched.

We have one file per type of objects (an endpoint), in which we define which endpoints and methods (get, post, etc.). We define which function is used for each method. The functions are defined in the Controllers folder.

### Controllers

We have one file per route, we import the Model and perform the validations and Model operations for the methods for each endpoint.
For example, to sign up a new user we use the '/register' route, we check if all the values are provided and whether a user already exists with the email. Then we create it using 'create' from the Model.

```js
//Server - Routes
//Create the route with id as the parameter
router.route('/:id').delete(deleteJob).patch(updateJob)

//Server - Controller
//id is given jobId alias is the parameter and values are in the body
const updateJob = async (req, res) => {
	const { id: jobId } = req.params
	const { company, position } = req.body
}

//Client - Context
//send patch request with jobId as parameter and {position,company} as body
const deleteJob = async (jobId) => {
  const { data } = await authFetch.patch(`/jobs/${jobId}`, {
    position,
    company
  })
}
```

### Middleware

Contains the middleware functions that are run for certain routes. For example, authenticate:
Two ways to use it:
```js
import authenticateUser from './middleware/auth.js';
//server.js
app.use('/api/v1/jobs', authenticateUser, jobsRouter); //Authenticate for all routes for this endpoint
//Server - Routes
router.route('/updateUser').patch(authenticateUser,updateUser); //Only authenticate for a specific route
```

### Data Aggregation

Aggregation Pipeline in MongoDB => https://www.mongodb.com/docs/manual/core/aggregation-pipeline/

## Front-End (client folder)

The Front-End is built with React. It's its own Node project (package.json file and node_modules folder).

The new documentation for React is great => https://beta.reactjs.org/learn

The public folder contains the icons, the manifest.json file and index.html

The src (Source) folder contains the code. At the root is the main CSS file (index.css) and JS file (index.js): they render the project. The index.js file references the App.js that contains the logic of the app.

### Components

Each React component is a file, they share state via the 'appContext'.

Note: every time we have a folder we adopt the practice of creating an index.js file in which we import all our files and export them, so it's easier to import in the rest of the code.

### Context

The state of the application across components is shared via the 'appContext.js' and 'reducer.js'. The types of events or actions are captured in the 'actions.js' file. The reducer maintains the global state while the appContext does the HTTP calls and maintains the web storage.

Reducers let you consolidate a component’s state update logic. Context lets you pass information deep down to other components. You can combine reducers and context together to manage state of a complex screen. More on the docs https://beta.reactjs.org/learn/scaling-up-with-reducer-and-context

```
1. Define the event is action.js
export const UPDATE_USER_BEGIN = 'UPDATE_USER_BEGIN'

2. Import in AppContext and dispatch events
import { UPDATE_USER_BEGIN } from './actions'
const updateUser = async (currentUser) => {
  dispatch({ type: UPDATE_USER_BEGIN });
  //do something
}

3. Import in reducer and update state based on events
if (action.type === UPDATE_USER_BEGIN) {
  return { ...state, isLoading: true }
}

```

We can still use a local state when needed in a component using React Hooks:
```js
const [varName,setVarNameFunction] = useState(defaultVarValue)
```

### Assets > Wrappers

We use a library called styled-components to write CSS in JavaScript. We can wrap components and style wth ease, hence the 'wrappers'. A wrapper wraps the output from the pages file to style it.

### Pages

The pages renders the different pages (or portion of pages) via calls from the App.js Routes using 'react-router-dom'.

### Communicate with the Server

The Front End communicates with the Back End via HTTP calls using Axios. Because this affects teh Global State of our Web Application, we use it in the AppContext.js. There would be 3 ways to implement the HTTP calls:

- A manual way - For each instance we define the url, method, data and Authorization - This would be good for one-off but it would create a lot of duplicate code in our case

```
const updaterUser = async (currentUser) => {
  try {
    const { data } = await axios.patch('/api/v1/auth/updateUser', currentUser, {
      headers: {Authorization: `Bearer ${state.token}` },
    });
    console.log(data);
  } catch (error) { console.log(error.response); } };
```

- A Global Setup - we setup the header as the global setup - The issue here is that the token would also be sent to all other apps, so it's a security issue

```
axios.defaults.headers['Authorization'] = `Bearer ${state.token}`;
```

- A Custom Instance with Interceptor - https://axios-http.com/docs/instance - This is the best way here. The interceptors intercept requests or responses before they are handled - https://axios-http.com/docs/interceptors (similar to a middleware)

```
const authFetch = axios.create({
  baseURL: '/api/v1',
});
authFetch.interceptors.request.use( (config) => {
    config.headers['Authorization'] = `Bearer ${state.token}`;
    return config; },
  (error) => { return Promise.reject(error);}
);
```

# Libraries Used

## Server

-  dotenv: Loads environment variables from .env file
-  express-async-errors: A way to catch errors at runtime without using try/catch blocks in your async functions
-  mongoose: Object Data Modeling (ODM) library for MongoDB distributed
-  validator: String validation and sanitization
-  bcryptjs: A bcrypt library - to hash and compare the passwords
-  jsonwebtoken: An implementation of JSON Web Tokens
-  http-status-codes: Easy access to HTTP Status Codes (200, 400, 404, etc.)
-  morgan: HTTP request logger middleware for node.js https://www.npmjs.com/package/morgan
-  concurrently: Run multiple commands concurrently (used to start server and client at the same time).

## Client

-  react
-  react-router-dom: Declarative routing for React web applications (client side routing) (Outlet, BrowserRouter, Routes, Route, Link)
-  normalize.css: Makes browsers render all elements more consistently and in line with modern standards.
-  styled-components: Allow to write CSS to style your components, removes the mapping between components and styles.
-  axios: Promise based HTTP client for the browser and node.js (https://axios-http.com/docs/intro).
-  react-icons: Library of icons from multiple sources (https://react-icons.github.io/react-icons).
-  Moment.js: Parse, validate, manipulate and display dates and times in JavaScript (https://momentjs.com).
-  Recharts: A composable charting library built on React components (https://recharts.org/).

# Design Resources

-  To Generate Favicons -> https://favicon.io/
-  Hipster Ipsum https://hipsum.co/
-  Cool images -> https://undraw.co
-  Color Designer to generate tints from a primary color -> https://colordesigner.io/

# Other

- All keys generator -> https://www.allkeysgenerator.com/
- JSON Web Token -> https://jwt.io/
- Need some mock data to test your app? Mockaroo lets you generate up to 1,000 rows of realistic test data in CSV, JSON, SQL, and Excel formats -> https://www.mockaroo.com

# Tips

### Input fields
```html
<input
    type={type}
    value={value}
    name={name}
    onChange={handleChange}
/>
onChange function typically (e) => setName(e.target.value)
```
```html
<button
  type="button"
  className="btn delete-btn"
  onClick={() => deleteJob(_id)}
  >
  Delete
</button>
```

### JavaScript
```
Array .reduce()
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
```
