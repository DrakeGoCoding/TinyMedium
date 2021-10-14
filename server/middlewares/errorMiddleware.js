const { SYSTEM_ERROR } = require("../resources/errors");

const handleError = (error, req, res, next) => {
	console.log(error);
	if (error.code) {
		res.status(error.code).send({ errors: error.body })
	} else {
		res.status(500).send({ errors: [SYSTEM_ERROR] });
	}
}

module.exports = {
	handleError
}