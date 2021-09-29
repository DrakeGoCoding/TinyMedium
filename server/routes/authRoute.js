const userController = require('../controllers/userController')

const router = require('express').Router()

router.post('/', userController.registerController)
router.post('/login', userController.loginController)
router.post('/logout', userController.logoutController)

module.exports = router