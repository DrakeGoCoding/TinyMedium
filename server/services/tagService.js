const Tag = require('../models/tag');
const { responseTags, responseTag } = require('../utils/responsor');

const allTags = async () => {
	const tagList = await Tag.find();
	return responseTags(tagList);
}

const popularTags = async () => {
	const tagList = await Tag.find().sort({ count: -1, name: 1 }).limit(9);
	return responseTags(tagList);
}

const createTag = async (tag) => {
	const newTag = new Tag(tag);
	const result = await newTag.save();
	return responseTag(result);
}

module.exports = {
	allTags,
	popularTags,
	createTag,
}