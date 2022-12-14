import express from 'express'
const app = express()

import dotenv from 'dotenv'
dotenv.config()

import 'express-async-errors'

//DB and authenticateUser
import connectDB from './db/connect.js'

//Routers
import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRoutes.js'

//middleware
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'
import authenticateUser from './middleware/auth.js'

import morgan from 'morgan'

if (process.env.NODE_ENV !== 'production') {
	app.use(morgan('dev'))
}

/* ONLY for PRODUCTION build */
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(express.static(path.resolve(__dirname, './client/build')))
/* */

app.use(express.json())
/* Security */
import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())
/* */

//We create the endpoint for the user authentication, pointing to the router file
app.use('/api/v1/auth', authRouter)
//We create the endpoint for the Jobs, using the middleware for authentication and pointing to the router file
app.use('/api/v1/jobs', authenticateUser, jobsRouter)

/* ONLY for PRODUCTION build */
app.get('*', function (request, response) {
	response.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})
/* */

//We specify the other middleware for route not found and error handler
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URL)
		app.listen(port, () =>
			console.log(`Server is listening on port ${port}...`)
		)
	} catch (error) {
		console.log(error)
	}
}
start()
