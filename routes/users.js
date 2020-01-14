const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');

router.get('/', usersController.profile);
router.get('/cool',usersController.profile);

module.exports = router;