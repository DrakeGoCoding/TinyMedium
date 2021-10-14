const { LOGIN, REGISTER } = require("../resources/actionTypes");
const { INVALID_EMAIL_OR_PASSWORD, INVALID_USERNAME, INVALID_EMAIL, INVALID_PASSWORD } = require("../resources/errors");

const validateUser = (user, type) => {
	let isValid = true;
	let errors = [];
	const { username, email, password } = user;

	switch (type) {
		case LOGIN:
			if (!email || !password) {
				isValid = false;
				errors.push(INVALID_EMAIL_OR_PASSWORD)
			}
			break;
		case REGISTER:
			let isValidUsername = validateUsername(username);
			!isValidUsername && errors.push(INVALID_USERNAME);

			let isValidEmail = validateEmail(email);
			!isValidEmail && errors.push(INVALID_EMAIL);

			let isValidPassword = validatePassword(password);
			!isValidPassword && errors.push(INVALID_PASSWORD);

			isValid = isValidUsername && isValidEmail && isValidPassword;
			break;
		default:
			break;
	}
	return { isValid, errors };
}

const validateUsername = (username) => {
	const USERNAME_REGEX = /^[a-zA-Z0-9]+$/;
	return USERNAME_REGEX.test(username);
}

const validateEmail = (email) => {
	const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
	return EMAIL_REGEX.test(email);
}

const validatePassword = (password) => {
	const PASSWORD_REGEX = /^[a-zA-Z0-9]{6,20}$/;
	return PASSWORD_REGEX.test(password);
}

const validateArticle = (article) => {
	let isValid = true;
	let errors = [];
	// TO DO
	return { isValid, errors }
}

module.exports = {
	validateUser,
	validateArticle,
}