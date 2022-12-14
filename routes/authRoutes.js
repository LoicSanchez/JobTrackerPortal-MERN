import express from 'express'
const router = express.Router()

import { register, login, updateUser } from '../controllers/authController.js'
import authenticateUser from '../middleware/auth.js'
import demoUser from '../middleware/demoUser.js'

import rateLimiter from 'express-rate-limit'
const apiLimiter = rateLimiter({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 10,
	message: 'Too many requests from this IP, please try again after 15 minutes',
})
router.route('/register').post(apiLimiter, register)
router.route('/login').post(apiLimiter, login)

// router.route('/register').post(register)
// router.route('/login').post(login)
router.route('/updateUser').patch(authenticateUser, demoUser, updateUser)

export default router
