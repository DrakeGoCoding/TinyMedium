const profileController = require('../controllers/profileController')

const router = require('express').Router()

router.get('/:username', profileController.getProfileController)
router.post('/:username/follow', profileController.followUserController)
router.delete('/:username/follow', profileController.unfollowUserController)

module.exports = router