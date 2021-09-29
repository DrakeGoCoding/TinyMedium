const mongoose = require('mongoose')

const profileSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		following: {
			type: Boolean,
			default: false,
		},
	}
)

const Profile = mongoose.model('Profile', profileSchema)
module.exports = Profile