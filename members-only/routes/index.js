var express = require('express');
var router = express.Router();
var passport = require("passport");
const async = require('async');
//Getting model controllers
const user_controller = require('../controllers/userController');
const post_controller = require('../controllers/postController');

const User = require('../models/user');
const Post = require('../models/post');

/* GET home page. */
// router.get('/', async function(req, res, next) {
//   Post.find({}, function (err, posts){
//     if(err){
//       res.send('error');
//       next();
//     }

     
//      res.render('index', {
//       title: 'Members only', 
//       user: req.user,
//       posts: posts,
//     })
// })});


router.get('/', function(req, res,next){
  Post.find({})
  .populate("user")
  .exec(function(err, posts){
    if(err){
      return res.send('error');
    }

    res.render('index', {
      title: 'members only',
      user: req.user,
      posts:posts,
    })
  })
})

// router.get('/', function(req, res, next) {
//    Post.find({}).then(function (post_list){
      

//       res.render('index', {
//         title: 'Members Only', 
//         user: req.user,
//         posts:post_list
//       })
//    })});
    // .populate("user")
    // .exec(function(err, list_posts){
    //   if(err){
    //     return next(err);
    //   }

    //   res.render('index', {
    //     title: 'Members-only',
    //     user: req.user,
    //     posts:list_posts,
    //   })
    // })


//Working GET home function (backup)
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', {
//     title: 'Members-only',
//     user: req.user,
    
//   })
// });




// //Solution from someone else: 
// /* GET home page. */
// router.get("/", function (req, res, next) {
//   Post.find({})
//     .populate("user")
//     .exec(function (err, list_posts) {
//       if (err) {
//         return next(err);
//       }

//       // How can I know the username...from the object Id?
//       res.render("index", {
//         title: "Members-Only",
//         user: req.user,
//         posts: list_posts,
//       });
//     });
// });

// router.get('/', post_controller.posts_list);


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

//Form GET
router.get("/post", post_controller.form_get);

//FORM post
router.get("/post", post_controller.form_post);






module.exports = router;
