const express = require('express');
const router = express.Router();
const passport=require('passport');

const postsController = require('../controllers/posts_controller');

router.post('/create',passport.checkAuthentication,postsController.create);//2nd authentication if unauthorized creates a fake post and submit
//1st authetication is while submitting post local.user



router.get('/destroy/:id',passport.checkAuthentication,postsController.destroy);


module.exports = router;



