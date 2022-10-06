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
    title: "Log in Page",
    user: req.user
  });
});

//GET request for sign up page
router.get('/signup', function(req, res,next){
  res.render('signup', '');
});

//POST request for sign up page
router.post('/signup', user_controller.user_signup_post);

//GET request for login page
router.get('/login', function(req, res, next){
  res.render('login', '');
});

//POST request for login page
router.post('/login', user_controller.user_login_post);
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);



//GET request for adding membership status page
router.get('/membership', function(req, res, next){
  res.send("test for membership status sign up page");
});

//GET request for admin status page
router.get('/admin', function(req, res, next){
  res.send("test for admin status page");
});


module.exports = router;
