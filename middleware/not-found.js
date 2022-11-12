const notFoundMiddleware = (req, res) =>
	res.status(404).send('Oops, Route does not exist')

export default notFoundMiddleware
