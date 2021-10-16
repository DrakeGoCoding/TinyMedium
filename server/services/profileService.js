const User = require("../models/user");
const { NOT_FOUND, NOT_ACCEPTABLE } = require("../resources/errors");
const { responseProfile } = require("../utils/responsor");

const getProfile = async (username, viewer) => {
	const foundUser = await User.findOne({ username });
	return responseProfile(foundUser, viewer);
}

const followUser = async (username, viewer) => {
	const foundUser = await User.findOne({ username });
	if (!foundUser) {
		throw ({ code: 404, body: [NOT_FOUND] });
	}

	if (foundUser._id.equals(viewer._id)) {
		throw ({ code: 406, body: [NOT_ACCEPTABLE] });
	}

	if (!foundUser.followedBy.some(id => id.equals(viewer._id))) {
		foundUser.followedBy.push(viewer._id);
		await foundUser.save();
	}
	if (!viewer.following.some(id => id.equals(foundUser._id))) {
		viewer.following.push(foundUser._id);
		await viewer.save();
	}

	return responseProfile(foundUser, viewer);
}

const unfollowUser = async (username, viewer) => {
	let foundUser = await User.findOne({ username });
	if (!foundUser) {
		throw ({ code: 404, body: [NOT_FOUND] });
	}

	if (foundUser.username === viewer.username) {
		throw ({ code: 406, body: [NOT_ACCEPTABLE] });
	}

	foundUser = await User.findOneAndUpdate(
		{ username },
		{ $pull: { followedBy: viewer._id } },
		{ new: true },
	)

	viewer = await User.findOneAndUpdate(
		{ username: viewer.username },
		{ $pull: { following: foundUser._id } },
		{ new: true },
	)

	return responseProfile(foundUser, viewer);
}

module.exports = {
	getProfile,
	followUser,
	unfollowUser,
}