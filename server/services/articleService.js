const Article = require('../models/article');
const Tag = require('../models/tag');
const User = require('../models/user');
const { NOT_FOUND } = require('../resources/errors');
const { responseArticle, responseArticles } = require('../utils/responsor');
const { validateArticle } = require('../utils/validator');

const allArticles = async (author = "", favorited = "", limit = 10, offset = 0, tag = "") => {
	let articles = [];
	let articlesCount = 0;
	let filter = {};

	if (author) {
		const foundAuthor = await User.findOne({ username: author });
		if (!foundAuthor) {
			return { articles, articlesCount };
		}
		filter['author'] = foundAuthor._id;
	}

	if (favorited) {
		const foundFavoritedUser = await User.findOne({ username: favorited });
		if (!foundFavoritedUser) {
			return { articles, articlesCount };
		}
		filter['favorited'] = foundFavoritedUser._id;
	}

	if (tag) {
		const foundTag = await Tag.findOne({ name: tag });
		if (!foundTag) {
			return { articles, articlesCount };
		}
		filter['tagList'] = foundTag._id;
	}

	articles = await Article
		.find(filter)
		.sort({ updatedAt: -1 })
		.skip(offset)
		.limit(limit);

	return await responseArticles(articles);
}

const feedArticles = async (user, limit = 10, offset = 0) => {
	console.log(user);
}

const articlesBySlug = async (slug) => {
	const result = await Article.findOne({ slug });
	return await responseArticle(result);
}

const createArticle = async (author, article) => {
	const { isValid, errors } = validateArticle(article);
	if (!isValid) {
		throw { code: 400, body: errors };
	}

	article.author = author._id;
	for (let i = 0; i < article.tagList.length; i++) {
		let tag = article.tagList[i];
		const foundTag = await Tag.findOne({ name: tag });
		if (foundTag) {
			foundTag.count += 1;
			await foundTag.save();
			article.tagList[i] = foundTag._id;
		} else {
			const newTag = new Tag({ name: tag, count: 1 });
			await newTag.save();
			article.tagList[i] = newTag._id;
		}
	}

	const newArticle = new Article(article);
	const result = await newArticle.save();

	return { article: await responseArticle(result, author) };
}

const favoriteArticle = async (slug, user) => {
	const foundArticle = await Article.findOne({ slug });
	if (!foundArticle) {
		throw { code: 404, body: [NOT_FOUND] };
	}

	if (!foundArticle.favoritedBy.includes(user._id)) {
		foundArticle.favoritedBy.push(user._id);
		await foundArticle.save();
	}

	if (!user.favoritedArticles.includes(foundArticle._id)) {
		user.favoritedArticles.push(foundArticle._id);
		await user.save();
	}

	return await responseArticle(foundArticle, user);
}

const updateArticle = async (slug, article) => {
	let foundArticle = await Article.findOne({ slug });
	if (!foundArticle) {
		throw { code: 404, body: [NOT_FOUND] };
	}
}

const delArticle = async (slug) => {

}

const unfavoriteArticle = async (slug, user) => {
	let foundArticle = await Article.findOne({ slug });
	if (!foundArticle) {
		throw { code: 404, body: [NOT_FOUND] };
	}

	foundArticle = await Article.findOneAndUpdate(
		{ slug },
		{ $pull: { favoritedBy: user._id } },
		{ new: true },
	)

	user = await User.findOneAndUpdate(
		{ username: user.username },
		{ $pull: { favoritedArticles: foundArticle._id } },
		{ new: true },
	)

	return await responseArticle(foundArticle, user);
}

const commentsForArticle = async (slug) => {

}

const createComment = async (slug, comment) => {

}

const delComment = async (slug, commentId) => {

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