const articleService = require('../services/articleService')

const allArticles = async (req, res, next) => {
	try {
		const { author, favorited, limit, offset, tag } = req.query;
		const result = await articleService.allArticles(author, favorited, limit, offset, tag);
		res.json(result);
	} catch (error) {
		next(error);
	}
}

const feedArticles = async (req, res, next) => {
	try {
		const { limit, offset } = req.query;
		const result = await articleService.feedArticles(req.user, limit, offset);
		res.json(result);
	} catch (error) {
		next(error);
	}
}

const articlesBySlug = async (req, res, next) => {
	try {
		const { slug } = req.params;
		const result = await articleService.articlesBySlug(slug);
		res.json(result);
	} catch (error) {
		next(error);
	}
}

const createArticle = async (req, res, next) => {
	try {
		const result = await articleService.createArticle(req.user, req.body.article);
		res.json(result);
	} catch (error) {
		next(error);
	}
}

const favoriteArticle = async (req, res, next) => {
	try {
		const { slug } = req.params;
		const result = await articleService.favoriteArticle(slug, req.user);
		res.json(result);
	} catch (error) {
		next(error);
	}
}

const updateArticle = async (req, res, next) => {
	try {
		const { slug } = req.params;
		const result = await articleService.updateArticle(slug, req.body.article, req.user);
		res.json(result);
	} catch (error) {
		next(error);
	}
}

const delArticle = async (req, res, next) => {
	try {
		const { slug } = req.params;
		const result = await articleService.delArticle(req.user, slug);
		res.json(result);
	} catch (error) {
		next(error);
	}
}

const unfavoriteArticle = async (req, res, next) => {
	try {
		const { slug } = req.params;
		const result = await articleService.unfavoriteArticle(slug, req.user);
		res.json(result);
	} catch (error) {
		next(error);
	}
}

const commentsForArticle = async (req, res, next) => {
	try {

	} catch (error) {
		next(error);
	}
}

const createComment = async (req, res, next) => {
	try {

	} catch (error) {
		next(error);
	}
}

const delComment = async (req, res, next) => {
	try {

	} catch (error) {
		next(error);
	}
}

module.exports = {
	allArticles,
	feedArticles,
	articlesBySlug,
	createArticle,
	favoriteArticle,
	updateArticle,
	delArticle,
	unfavoriteArticle,

	commentsForArticle,
	createComment,
	delComment
}