var express = require('express');
var router = express.Router();
var passport = require("passport");

//Getting model controllers
const user_controller = require('../controllers/userController');
const post_controller = require('../controllers/postController');

const User = require('../models/user');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Express',
    user: req.user,
  });
});

//GET request for sign up page
router.get('/signup', function(req, res,next){
  res.render('signup', '');
});

//POST request for sign up page
router.post('/signup', user_controller.user_signup_post);

//GET request for login page
router.get('/login', user_controller.user_login_get);

//POST request for login page
router.post('/login', user_controller.user_login_post);



//GET request for admin status page
router.get('/admin', function(req, res, next){
  res.send("test for admin status page");
});

//Logout functionality
router.get('/logout', (req, res, next) => {
  req.logout(function(err){
    if(err){
      return next(err);
    }
    res.redirect('/');
  }
  
)});

//GET request for creating a post form
router.get('/createpost', post_controller.form_get);

//POST request for submitting post form
router.post('/createpost', post_controller.form_post);

//GET request for signing up for membership
router.get('/membership', user_controller.membership_get);

//POST request for  signing up for membership
router.post('/membership', user_controller.membership_post);



module.exports = router;
