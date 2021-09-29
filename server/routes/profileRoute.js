const {
	getProfileController,
	followUserController,
	unfollowUserController,
} = require('../controllers/profileController')

const router = require('express').Router()

router.get('/:username', getProfileController)
router.post('/:username/follow', followUserController)
router.delete('/:username/follow', unfollowUserController)

module.exports = router