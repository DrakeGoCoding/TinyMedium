const mongoose = require('mongoose')

const articleSchema = mongoose.Schema(
	{
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Profile',
		},
		title: String,
		description: String,
		body: String,
		slug: String,
		tagList: Array,
		createdAt: {
			type: Date,
			default: Date.now
		},
		updatedAt: {
			type: Date,
			default: Date.now
		},
		favorited: Boolean,
		favoritesCount: {
			type: Number,
			default: 0,
		},
	}
)

const Article = mongoose.model('Article', articleSchema)
module.exports = Article