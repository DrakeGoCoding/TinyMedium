const router = require('express').Router();
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middlewares/authMiddleware');
const optionMiddleware = require('../middlewares/optionMiddleware');

router.get('/:username', optionMiddleware.optionalUserToken, profileController.getProfile);
router.post('/:username/follow', authMiddleware.verifyUserToken, profileController.followUser);
router.delete('/:username/follow', authMiddleware.verifyUserToken, profileController.unfollowUser);

module.exports = router;