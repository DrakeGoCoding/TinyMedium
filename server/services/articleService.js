const Article = require('../models/article');
const Comment = require('../models/comment');
const Tag = require('../models/tag');
const User = require('../models/user');
const { NOT_FOUND, NO_SLUG_SPECIFIED, UNAUTHORIZED } = require('../resources/errors');
const {
	responseArticle,
	responseArticles,
	responseComment,
	responseComments
} = require('../utils/responsor');
const { validateArticle, validateComment } = require('../utils/validator');

const allArticles = async (author, favorited, limit = 10, offset = 0, tag, viewer) => {
	let articles = [];
	let articlesCount = 0;
	let filter = {};

	if (author && author.trim().length > 0) {
		const foundAuthor = await User.findOne({ username: author });
		if (!foundAuthor) {
			return { articles, articlesCount };
		}
		filter['author'] = foundAuthor._id;
	}

	if (favorited && favorited.trim().length > 0) {
		const foundFavoritedUser = await User.findOne({ username: favorited });
		if (!foundFavoritedUser) {
			return { articles, articlesCount };
		}
		filter['favoritedBy'] = foundFavoritedUser._id;
	}

	if (tag && tag.trim().length > 0) {
		const foundTag = await Tag.findOne({ name: tag });
		if (!foundTag) {
			return { articles, articlesCount };
		}
		filter['tagList'] = foundTag._id;
	}

	articles = await Article
		.find(filter)
		.sort({ updatedAt: -1 });

	return await responseArticles(articles, limit, offset, viewer);
}

const feedArticles = async (user, limit = 10, offset = 0) => {
	const feedUserIds = [user._id, ...user.following];
	const articleList = await Article
		.find({ author: { $in: feedUserIds } })
		.sort({ updatedAt: -1 });

	return await responseArticles(articleList, limit, offset, user);
}

const articlesBySlug = async (slug, viewer) => {
	const result = await Article.findOne({ slug });
	return await responseArticle(result, viewer);
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

	return await responseArticle(result, author);
}

const favoriteArticle = async (slug, user) => {
	const foundArticle = await Article.findOne({ slug });
	if (!foundArticle) {
		throw { code: 404, body: [NOT_FOUND] };
	}

	if (!foundArticle.favoritedBy.some(id => id.equals(user._id))) {
		foundArticle.favoritedBy.push(user._id);
		await foundArticle.save();
	}

	if (!user.favoritedArticles.some(id => id.equals(foundArticle._id))) {
		user.favoritedArticles.push(foundArticle._id);
		await user.save();
	}

	return await responseArticle(foundArticle, user);
}

const updateArticle = async (slug, article, user) => {
	let foundArticle = await Article.findOne({ slug });
	if (!foundArticle) {
		throw { code: 404, body: [NOT_FOUND] };
	}

	if (!foundArticle.author.equals(user._id)) {
		throw { code: 401, body: [UNAUTHORIZED] };
	}

	const { isValid, errors } = validateArticle(article);
	if (!isValid) {
		throw { code: 400, body: errors };
	}

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

	Object.assign(foundArticle, article, { updatedAt: Date.now() });
	const result = await foundArticle.save();
	return await responseArticle(result);
}

const delArticle = async (user, slug) => {
	if (!slug) {
		throw { code: 400, body: [NO_SLUG_SPECIFIED] };
	}

	const deleteArticle = await Article.findOneAndDelete({ author: user._id, slug }, { new: true });
	if (!deleteArticle) {
		throw { code: 401, body: [UNAUTHORIZED] };
	}
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

const commentsForArticle = async (slug, viewer) => {
	const foundArticle = await Article.findOne({ slug });
	if (!foundArticle) {
		throw { code: 404, body: [NOT_FOUND] };
	}

	const comments = await Comment
		.find({ _id: { $in: foundArticle.comments } })
		.sort({ updatedAt: -1 });
	return await responseComments(comments, viewer);
}

const createComment = async (slug, comment, author) => {
	const foundArticle = await Article.findOne({ slug });
	if (!foundArticle) {
		throw { code: 404, body: [NOT_FOUND] };
	}

	const { isValid, errors } = validateComment(comment);
	if (!isValid) {
		throw { code: 400, body: errors };
	}

	const newComment = new Comment({
		author: author._id,
		body: comment.body
	})

	const result = await newComment.save();
	foundArticle.comments.push(result._id);
	foundArticle.updatedAt = Date.now();
	await foundArticle.save();

	return await responseComment(result, author);
}

const delComment = async (slug, commentId, user) => {
	const foundArticle = await Article.findOne({ slug });
	if (!foundArticle) {
		throw { code: 404, body: [NOT_FOUND] };
	}

	const result = await Comment.findOneAndDelete({ _id: commentId, author: user._id });
	if (!result) {
		throw { code: 401, body: [UNAUTHORIZED] };
	}

	foundArticle.comments = foundArticle.comments.filter(id => !id.equals(commentId));
	await foundArticle.save();
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