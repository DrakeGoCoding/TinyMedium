const articleController = require('../controllers/articleController')

const router = require('express').Router()

router.get('/feed', articleController.getFeedController)
router.get('/', articleController.getGlobalController)
router.get('/:slug', articleController.getBySlugController)
router.post('/', articleController.postArticleController)
router.put('/:slug', articleController.updateBySlugController)
router.delete('/:slug', articleController.deleteBySlugController)

router.get('/:slug/comments', articleController.getCommentsController)
router.post('/:slug/comments', articleController.postCommentController)
router.delete('/:slug/comments/:id', articleController.deleteCommentController)

router.post('/:slug/favorite', articleController.favoriteBySlugController)
router.delete('/:slug/favorite', articleController.unfavoriteBySlugController)

module.exports = router