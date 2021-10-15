const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { validateUser } = require('../utils/validator');
const { REGISTER, LOGIN, UPDATE } = require('../resources/actionTypes');
const { REGISTERED_EMAIL, INCORRECT_EMAIL_OR_PASSWORD, UNAUTHORIZED, REGISTERED_USERNAME } = require('../resources/errors');
const { responseUser } = require('../utils/responsor');

const register = async (user) => {
	const { isValid, errors } = validateUser(user, REGISTER);
	if (!isValid) {
		throw { code: 400, body: errors };
	}

	let foundUser;
	foundUser = await User.findOne({ username: user.username });
	if (foundUser) {
		throw { code: 400, body: [REGISTERED_USERNAME] }
	}

	foundUser = await User.findOne({ email: user.email });
	if (foundUser) {
		throw { code: 400, body: [REGISTERED_EMAIL] }
	}

	const newUser = new User(user);
	const token = jwt.sign(
		{ id: newUser._id },
		process.env.TOKEN_SECRET,
		{ expiresIn: '30d' }
	);
	newUser.token = token;
	await newUser.save();

	return responseUser(newUser);
}

const login = async (user) => {
	const { isValid, errors } = validateUser(user, LOGIN);

	if (!isValid) {
		throw { code: 400, body: errors };
	}

	const foundUser = await User.findOne({ email: user.email });
	if (!foundUser) {
		throw { code: 400, body: [INCORRECT_EMAIL_OR_PASSWORD] }
	}

	const isValidPassword = await bcrypt.compare(user.password, foundUser.password);
	if (!isValidPassword) {
		throw { code: 400, body: [INCORRECT_EMAIL_OR_PASSWORD] }
	}

	const token = jwt.sign(
		{ id: foundUser._id },
		process.env.TOKEN_SECRET,
		{ expiresIn: '30d' }
	);
	foundUser.token = token;
	const result = await foundUser.save();

	return responseUser(result);
}

const logout = async (user) => {
	user.token = "";
	await user.save();
}

const currentUser = async (payload) => {
	return responseUser(payload);
}

const updateUser = async (user, toUpdateUser) => {
	if (user.email !== toUpdateUser.email) {
		throw { code: 401, body: [UNAUTHORIZED] };
	}

	const { isValid, errors } = validateUser(toUpdateUser, UPDATE);
	if (!isValid) {
		throw { code: 400, body: errors };
	}

	Object.assign(user, toUpdateUser);
	const result = await user.save();
	return responseUser(result);
}

module.exports = {
	register,
	login,
	logout,
	currentUser,
	updateUser,
}