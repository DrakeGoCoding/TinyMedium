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

const createTag = async (tagName) => {
	const foundTag = await Tag.findOne({ name: tagName.toLowerCase() });
	if (foundTag) {
		foundTag.count += 1;
		await foundTag.save();
		return responseTag(foundTag);
	}
	const newTag = new Tag(tagName);
	const result = await newTag.save();
	return responseTag(result);
}

module.exports = {
	allTags,
	popularTags,
	createTag,
}