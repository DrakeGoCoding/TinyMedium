const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const articleSchema = mongoose.Schema({
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	title: {
		type: String,
		required: true,
		trim: true,
	},
	description: {
		type: String,
		required: true,
		trim: true,
	},
	body: {
		type: String,
		required: true,
		trim: true,
	},
	slug: {
		type: String,
		slug: ["title"],
		unique: true,
	},
	comments: {
		type: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment',
		}],
		default: [],
	},
	tagList: {
		type: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Tag',
		}],
		default: [],
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	},
	favoritedBy: {
		type: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		}],
		default: [],
	},
});

const Article = mongoose.model('Article', articleSchema);
module.exports = Article;