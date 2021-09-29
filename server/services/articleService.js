const Article = require('../models/article')

const getFeed = async (limit = 20, offset = 0) => {

}

const getGlobal = async (tagFilter = "", authorFilter = "", userFilter = "", limit = 20, offset = 0) => {

}

const getBySlug = async (slug) => {

}

const postArticle = async (article) => {

}

const updateBySlug = async (slug, article) => {

}

const deleteBySlug = async (slug) => {

}

const getComments = async (slug) => {

}

const postComment = async (slug, comment) => {

}

const deleteComment = async (slug, id) => {

}

const favoriteBySlug = async (slug) => {

}

const unfavoriteBySlug = async (slug) => {

}

module.exports = {
	getFeed,
	getGlobal,
	getBySlug,
	postArticle,
	updateBySlug,
	deleteBySlug,

	getComments,
	postComment,
	deleteComment,

	favoriteBySlug,
	unfavoriteBySlug,
}