const router = require('express').Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware.verifyUserToken, userController.currentUser);
router.put('/', authMiddleware.verifyUserToken, userController.updateUser);
router.post('/logout', authMiddleware.verifyUserToken, userController.logout);

module.exports = router;