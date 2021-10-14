const userService = require('../services/userService')

const register = async (req, res, next) => {
	try {
		const result = await userService.register(req.body.user);
		res.json(result);
	} catch (error) {
		next(error);
	}
}

const login = async (req, res, next) => {
	try {
		const result = await userService.login(req.body.user);
		res.json(result);
	} catch (error) {
		next(error);
	}
}

const logout = async (req, res, next) => {
	try {
		const result = await userService.logout(req.user);
		res.json(result);
	} catch (error) {
		next(error);
	}
}

const currentUser = async (req, res, next) => {
	try {
		const result = await userService.currentUser(req.user);
		res.json(result);
	} catch (error) {
		next(error);
	}
}

const updateUser = async (req, res, next) => {
	try {
		const result = await userService.updateUser(req.user, req.body.user);
		res.json(result);
	} catch (error) {
		next(error);
	}
}

module.exports = {
	register,
	login,
	logout,
	currentUser,
	updateUser,
}