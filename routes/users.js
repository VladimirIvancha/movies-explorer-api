const router = require('express').Router();
const { updateUserValidator } = require('../middlewares/validation');
const { getUserMe, updateUser } = require('../controllers/users');

router.get('/me', getUserMe);
router.patch('/me', updateUserValidator, updateUser);

module.exports = router;
