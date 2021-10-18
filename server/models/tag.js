const mongoose = require('mongoose');

const tagSchema = mongoose.Schema({
	name: {
		type: String,
		lowercase: true,
		trim: true,
		required: true,
		uniqued: true,
	},
	count: {
		type: Number,
		default: 0
	}
})

const Tag = mongoose.model('Tag', tagSchema);
module.exports = Tag;