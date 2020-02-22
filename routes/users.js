const express = require('express');
const router = express.Router();
const passport=require('passport');
const usersController = require('../controllers/users_controller');

router.get('/profile/:id',passport.checkAuthentication, usersController.profile);
router.post('/update/:id', passport.checkAuthentication, usersController.update);
router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);


router.post('/create',usersController.create);


//use passport as middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);

router.get('/sign-out',usersController.destroySession);

/*router.post('/create-session', function(req, res, next) {
    console.log(req.body);
    passport.authenticate('local', function(err, user, info) {
    console.log("authenticate");
    console.log(err);
    console.log(user);
    console.log(info);
    })(req, res, next);
    });*/

 
module.exports = router;