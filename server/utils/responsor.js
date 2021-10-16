const Tag = require("../models/tag");
const User = require("../models/user");

const responseUser = user => {
	if (!user) {
		return { user: {} };
	}

	return {
		user: {
			username: user.username,
			email: user.email,
			bio: user.bio,
			image: user.image,
			token: user.token
		}
	}
}

const responseTag = tag => {
	return { tag: tag ? tag.name : "" };
}

const responseTags = (tags) => {
	if (!tags || tags.length === 0) {
		return { tags: [] };
	}
	return { tags: tags.map(tag => tag.name) };
}

const responseArticle = async (article, viewer) => {
	if (!article) {
		return { article: {} };
	}

	const author = await User.findById(article.author);
	const tagList = await Tag.find({ _id: { $in: article.tagList } });

	return {
		article: {
			author: responseProfile(author, viewer).profile,
			slug: article.slug,
			title: article.title,
			description: article.description,
			body: article.body,
			tagList: responseTags(tagList).tags,
			createdAt: article.createdAt,
			updatedAt: article.updatedAt,
			favorited: viewer ? article.favoritedBy.some(id => id.equals(viewer._id)) : false,
			favoritesCount: article.favoritedBy.length,
		}
	}
}

const responseArticles = async (articles, limit = 10, offset = 0, viewer) => {
	if (!articles || articles.length === 0) {
		return { articles: [], articlesCount: 0 };
	}

	let articleList = [];
	for (let i = offset, count = 0; i < articles.length && count < limit; i++, count++) {
		articleList.push((await responseArticle(articles[i], viewer)).article);
	}

	return { articles: articleList, articlesCount: articles.length };
}

const responseProfile = (user, viewer) => {
	if (!user) {
		return { profile: {} };
	}

	return {
		profile: {
			username: user.username,
			bio: user.bio,
			image: user.image,
			following: viewer ? viewer.following.some(id => id.equals(user._id)) : false,
		}
	}
}

const responseComment = async (comment, viewer) => {
	if (!comment) {
		return { comment: {} };
	}

	const author = await User.findById(comment.author);

	return {
		comment: {
			id: comment._id,
			createdAt: comment.createdAt,
			updatedAt: comment.updatedAt,
			body: comment.body,
			author: responseProfile(author, viewer).profile,
		}
	};
}

const responseComments = async (comments, viewer) => {
	if (!comments || comments.length === 0) {
		return { comments: [] };
	}

	let commentList = []
	for (let i = 0; i < comments.length; i++) {
		commentList.push((await responseComment(comments[i], viewer)).comment);
	}

	return { comments: commentList };
}

module.exports = {
	responseUser,
	responseTag,
	responseTags,
	responseArticle,
	responseArticles,
	responseProfile,
	responseComment,
	responseComments,
}