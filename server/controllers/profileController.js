const profileService = require('../services/profileService')

const getProfile = async (req, res, next) => {
	try {
		const { username } = req.params;
		const result = await profileService.getProfile(username, req.user);
		res.json(result);
	} catch (error) {
		next(error);
	}
}

const followUser = async (req, res, next) => {
	try {
		const { username } = req.params;
		const result = await profileService.followUser(username, req.user);
		res.json(result);
	} catch (error) {
		next(error);
	}
}

const unfollowUser = async (req, res, next) => {
	try {
		const { username } = req.params;
		const result = await profileService.unfollowUser(username, req.user);
		res.json(result);
	} catch (error) {
		next(error);
	}
}

module.exports = {
	getProfile,
	followUser,
	unfollowUser,
}