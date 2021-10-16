const articleController = require('../controllers/articleController')
const authMiddleware = require('../middlewares/authMiddleware');
const optionMiddleware = require('../middlewares/optionMiddleware');

const router = require('express').Router()

router.get('/', optionMiddleware.optionalUserToken, articleController.allArticles);
router.get('/feed', authMiddleware.verifyUserToken, articleController.feedArticles);
router.get('/:slug', optionMiddleware.optionalUserToken, articleController.articlesBySlug);
router.post('/', authMiddleware.verifyUserToken, articleController.createArticle);
router.post('/:slug/favorite', authMiddleware.verifyUserToken, articleController.favoriteArticle);
router.put('/:slug', authMiddleware.verifyUserToken, articleController.updateArticle);
router.delete('/:slug', authMiddleware.verifyUserToken, articleController.delArticle);
router.delete('/:slug/favorite', authMiddleware.verifyUserToken, articleController.unfavoriteArticle);

router.get('/:slug/comments', articleController.commentsForArticle);
router.post('/:slug/comments', authMiddleware.verifyUserToken, articleController.createComment);
router.delete('/:slug/comments/:commentId', authMiddleware.verifyUserToken, articleController.delComment);

module.exports = router;