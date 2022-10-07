var express = require('express');
var router = express.Router();

const user_controller = require('../controllers/userController');
const post_controller = require('../controllers/postController');


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

//GET request for adding membership status page
router.get('/membership', function(req, res, next){
  res.send("test for membership status sign up page");
});

//GET request for admin status page
router.get('/admin', function(req, res, next){
  res.send("test for admin status page");
});


module.exports = router;
