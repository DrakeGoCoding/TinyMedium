const jwt = require('jsonwebtoken')
const User = require('../models/user')

const verifyUserToken = (req, res, next) => {
	let token = req.headers.authorization;
	if (!token) return res.status(401).send('Access Denied / Unauthorized request');

	try {
		token = token.split(' ')[1];
		if (token === 'null' || !token) {
			return res.status(401).send('Unauthorized request');
		}

		jwt.verify(token, process.env.TOKEN_SECRET, async (err, payload) => {
			if (err) {
				return res.status(401).send('Unauthorized request');
			}
			const verifiedUser = await User.findById(payload.id).exec();
			if (!verifiedUser) {
				return res.status(401).send('Unauthorized request');
			}

			req.user = verifiedUser;
			next();
		})
	} catch (error) {
		res.status(400).send('Invalid token');
	}
}

const isUser = async (req, res, next) => {
	if (req.user.userTypeId === 0) {
		next();
	}
	return res.status(401).send('Unauthorized')
}

const isAdmin = async (req, res, next) => {
	if (req.user.userTypeId === 1) {
		next();
	}
	return res.status(401).send('Unauthorized')
}

module.exports = {
	verifyUserToken,
	isUser,
	isAdmin,
}