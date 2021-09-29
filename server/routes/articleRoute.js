const {
	getFeedController,
	getGlobalController,
	getSlugController,
	postSlugController,
	updateSlugController,
	deleteSlugController,
	getCommentsController,
	postCommentController,
	deleteCommentController,
	favoriteSlugController,
	unfavoriteSlugController,
} = require('../controllers/articleController')

const router = require('express').Router()

router.get('/feed', getFeedController)
router.get('/', getGlobalController)
router.get('/:slug', getSlugController)
router.post('/', postSlugController)
router.put('/:slug', updateSlugController)
router.delete('/:slug', deleteSlugController)

router.get('/:slug/comments', getCommentsController)
router.post('/:slug/comments', postCommentController)
router.delete('/:slug/comments/:id', deleteCommentController)

router.post('/:slug/favorite', favoriteSlugController)
router.delete('/:slug/favorite', unfavoriteSlugController)

module.exports = router