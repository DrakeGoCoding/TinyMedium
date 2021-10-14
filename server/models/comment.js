const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	article: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Article',
		required: true,
	},
	body: {
		type: String,
		default: "",
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	},
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;