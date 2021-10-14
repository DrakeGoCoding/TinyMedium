const tagService = require('../services/tagService');

const allTags = async (req, res, next) => {
	try {
		const result = await tagService.allTags();
		res.json(result);
	} catch (error) {
		next(error);
	}
}

const popularTags = async (req, res, next) => {
	try {
		const result = await tagService.popularTags();
		res.json(result);
	} catch (error) {
		next(error);
	}
}

const createTag = async (req, res, next) => {
	try {
		const result = await tagService.createTag(req.body.tag);
		res.json(result);
	} catch (error) {
		next(error);
	}
}

module.exports = {
	allTags,
	popularTags,
	createTag,
}