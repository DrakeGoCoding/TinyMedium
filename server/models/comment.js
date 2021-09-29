const mongoose = require('mongoose')

const commentSchema = mongoose.Schema(
	{
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Profile',
		},
		body: String,
		createdAt: {
			type: Date,
			default: Date.now
		},
		updatedAt: {
			type: Date,
			default: Date.now
		},
	}
)

const Comment = mongoose.model('Comment')
module.exports = Comment