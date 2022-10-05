var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//GET request for sign up page
router.get('/signup', function(req, res,next){
  res.render('signup', '');
});

//POST request for sign up page
router.post('/signup', function(req, res, next){
  res.send("test for signup post");
});

//GET request for login page
router.get('/login', function(req, res, next){
  res.render('login', '');
});

//POST request for login page
router.post('/login', function(req, res, next){
  res.send("test for login post");
});

//GET request for adding membership status page
router.get('/membership', function(req, res, next){
  res.send("test for membership status sign up page");
});

//GET request for admin status page
router.get('/admin', function(req, res, next){
  res.send("test for admin status page");
});


module.exports = router;
