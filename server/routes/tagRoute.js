const tagController = require('../controllers/tagController');

const router = require('express').Router();

router.get('/', tagController.allTags);
router.get('/popular', tagController.popularTags);
router.post('/', tagController.createTag);

module.exports = router;