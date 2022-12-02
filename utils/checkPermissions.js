import { UnAuthenticatedError } from '../errors/index.js'

const checkPermissions = (requestUser, resourceUserID) => {
	//if (requestUser.role='admin') return
	if (requestUser.userId === resourceUserID.toString()) return
	throw new UnAuthenticatedError('Not authorized to access this route')
}
export default checkPermissions
