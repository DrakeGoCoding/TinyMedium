const jwt = require('jsonwebtoken')
const User = require('../models/user');

const optionalUserToken = (req, res, next) => {
	let token = req.headers.authorization;
	if (!token) {
		next();
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
			const foundUser = await User.findById(payload.id).exec();
			if (foundUser) {
				if (foundUser.token !== token) {
					return res.status(401).send({ errors: [INVALID_TOKEN] });
				}
				req.user = foundUser;
			}
			next();
		})
	} catch (error) {
		res.status(500).send({ errors: [SYSTEM_ERROR] });
	}
}

module.exports = {
	optionalUserToken,
}