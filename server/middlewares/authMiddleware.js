const jwt = require('jsonwebtoken')
const User = require('../models/user');
const { UNAUTHORIZED, INVALID_TOKEN, SYSTEM_ERROR } = require('../resources/errors');

const verifyUserToken = (req, res, next) => {
	let token = req.headers.authorization;
	if (!token) {
		return res.status(401).send({ errors: [UNAUTHORIZED] });
	}

	try {
		token = token.split(' ')[1];
		if (token === 'null' || !token) {
			return res.status(401).send({ errors: [INVALID_TOKEN] });
		}

		jwt.verify(token, process.env.TOKEN_SECRET, async (err, payload) => {
			if (err) {
				return res.status(401).send({ errors: [INVALID_TOKEN] });
			}
			const verifiedUser = await User.findById(payload.id).exec();
			if (!verifiedUser || verifiedUser.token !== token) {
				return res.status(401).send({ errors: [INVALID_TOKEN] });
			}

			req.user = verifiedUser;
			next();
		})
	} catch (error) {
		res.status(500).send({ errors: [SYSTEM_ERROR] });
	}
}

const isUser = async (req, res, next) => {
	if (req.user.userTypeId === 0) {
		next();
	}
	return res.status(401).send({ errors: [UNAUTHORIZED] })
}

const isAdmin = async (req, res, next) => {
	if (req.user.userTypeId === 1) {
		next();
	}
	return res.status(401).send({ errors: [UNAUTHORIZED] })
}

module.exports = {
	verifyUserToken,
	isUser,
	isAdmin,
}