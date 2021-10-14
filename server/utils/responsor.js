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
	const tagList = await Tag.find({ _id: { $in: article.tagList } })

	return {
		article: {
			author: responseProfile(author, viewer),
			slug: article.slug,
			title: article.title,
			description: article.description,
			body: article.body,
			tagList: responseTags(tagList).tags,
			createdAt: article.createdAt,
			updatedAt: article.updatedAt,
			favorited: viewer ? article.favoritedBy.includes(viewer._id) : false,
			favoritesCount: article.favoritedBy.length,
		}
	}
}

const responseArticles = async (articles) => {
	if (!articles || articles.length === 0) {
		return { articles: [], articlesCount: 0 };
	}

	let articlesCount = articles.length;

	for (let i = 0; i < articlesCount; i++) {
		articles[i] = (await responseArticle(articles[i])).article;
	}

	return { articles, articlesCount };
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
			following: viewer ? viewer.following.includes(user._id) : false,
		}
	}
}

module.exports = {
	responseUser,
	responseTag,
	responseTags,
	responseArticle,
	responseArticles,
	responseProfile,
}