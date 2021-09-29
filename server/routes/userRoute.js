const {
	getController,
	updateController,
} = require('../controllers/userController')

const router = require('express').Router()
router.get('/', getController)
router.put('/', updateController)

module.exports = router