const { LOGIN, REGISTER, UPDATE } = require("../resources/actionTypes");
const { INVALID_EMAIL_OR_PASSWORD, INVALID_USERNAME, INVALID_EMAIL, INVALID_PASSWORD, INVALID_TITLE, INVALID_DESCRIPTION, INVALID_BODY } = require("../resources/errors");

const validateUser = (user, type) => {
	let isValid = true;
	let isValidEmail = true, isValidUsername = true, isValidPassword = true;
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
			isValidUsername = validateUsername(username);
			!isValidUsername && errors.push(INVALID_USERNAME);

			isValidEmail = validateEmail(email);
			!isValidEmail && errors.push(INVALID_EMAIL);

			isValidPassword = validatePassword(password);
			!isValidPassword && errors.push(INVALID_PASSWORD);

			isValid = isValidUsername && isValidEmail && isValidPassword;
			break;

		case UPDATE:
			if (username) {
				isValidUsername = validateUsername(username);
				!isValidUsername && errors.push(INVALID_USERNAME);
			}
			if (password) {
				isValidPassword = validatePassword(password);
				!isValidPassword && errors.push(INVALID_PASSWORD);
			}
			isValid = isValidEmail && isValidPassword;
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
	if (!article.title.trim().length) {
		isValid = false;
		errors.push(INVALID_TITLE);
	};
	if (!article.description.trim().length) {
		isValid = false;
		errors.push(INVALID_DESCRIPTION);
	}
	if (!article.body.trim().length) {
		isValid = false;
		errors.push(INVALID_BODY);
	}
	return { isValid, errors };
}

module.exports = {
	validateUser,
	validateArticle,
}