import express from 'express'
const router = express.Router()

import {
	createJob,
	deleteJob,
	getAllJobs,
	updateJob,
	showStats,
} from '../controllers/jobsController.js'

import demoUser from '../middleware/demoUser.js'

router.route('/').post(demoUser, createJob).get(getAllJobs)
router.route('/stats').get(showStats)
router.route('/:id').delete(demoUser, deleteJob).patch(demoUser, updateJob)

export default router
