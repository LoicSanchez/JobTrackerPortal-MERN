import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js'

const register = async (req, res) => {
	const { name, email, password } = req.body
	if (!name || !email || !password) {
		throw new BadRequestError('Required values are missing')
	}

	const userAlreadyExists = await User.findOne({ email })
	if (userAlreadyExists) {
		throw new BadRequestError('Email is not already in use')
	}

	const user = await User.create({ name, email, password })
	const token = user.createJWT()
	res.status(StatusCodes.CREATED).json({
		user: {
			email: user.email,
			name: user.name,
			lastName: user.lastName,
			location: user.location,
			jobLocation: user.location,
		},
		token,
	})
}
const login = async (req, res) => {
	const { email, password } = req.body
	if (!email || !password) {
		throw new BadRequestError('Login - Please provide email and password')
	}
	const user = await User.findOne({ email }).select('+password')
	if (!user) {
		throw new UnAuthenticatedError('Invalid login')
	}
	const isPasswordCorrect = await user.comparePassword(password)

	if (!isPasswordCorrect) {
		throw new UnAuthenticatedError('Invalid password')
	}

	user.password = undefined
	const token = user.createJWT()
	res.status(StatusCodes.OK).json({ user, token, location: user.location })
}
const updateUser = async (req, res) => {
	const { name, email, lastName, location } = req.body
	if (!name || !email || !lastName || !location) {
		throw new BadRequestError('Please provide all values')
	}
	const user = await User.findOne({_id: req.user.userId})

	user.name = name
	user.email = email
	user.lastName = lastName
	user.location = location

	await user.save()

	const token = user.createJWT()

	res.status(StatusCodes.OK).json({ user, token, location: user.location })
}
export { register, login, updateUser }
