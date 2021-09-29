const {
	getCurrentUserController,
	updateUserController,
} = require('../controllers/userController')

const router = require('express').Router()
router.get('/', getCurrentUserController)
router.put('/', updateUserController)

module.exports = router