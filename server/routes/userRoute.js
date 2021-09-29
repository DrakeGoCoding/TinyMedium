const userController = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = require('express').Router()

router.get('/', authMiddleware.verifyUserToken, userController.getUserController)
router.put('/', authMiddleware.verifyUserToken, userController.updateUserController)

module.exports = router