const User = require('../models/user');
const Post = require('../models/post');
const {body, validationResult} = require("express-validator");
const async = require("async");
const bcrypt = require("bcrypt");
const { deleteOne } = require('../models/user');
const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;



  
// //GET request on signup form
// exports.user_signup_get = function(req, res, next){
//   res.render('index', {user: req.user});
// }
exports.user_login_get = (req, res) => {
    res.render('login', {title: "Login", user: res.locals.currentUser});
};


//POST request for login form

exports.user_login_post = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
})

// exports.user_login_post = [
//     body('password', 'password cannot be empty')
//       .trim()
//       .isLength({min:1})
//       .escape(),
  
//       (req, res, next) => {
//           const errors = validationResult(req);
          
      
//           if (!errors.isEmpty()) {
//              return res.render("login");
              
//           }
      
//           next();
      
//       },
// ];
  
//GET request on signup form


//POST request on signup form
exports.user_signup_post = [
    body('username', 'username cannot be empty')
        .trim()
        .isLength({min:1})
        .escape(),
    body('password', 'password cannot be empty')
        .trim()
        .isLength({min:1})
        .escape(),
    body('email', 'email cannot be empty')
        .trim()
        .isLength({min:1})
        .escape(),
    
    async (req, res, next) => {
        
        
        const hashedPassword =  await bcrypt.hash(req.body.password, 10);

        const errors = validationResult(req);

        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            membership: false,
            admin_status: false,
        });

        if (!errors.isEmpty()){
            return res.render('index', {
                title: "You have been logged in successfully",
                user,
                errors: errors.array(),
            });
        } else {
            user.save((err) => {
                if (err) return next(err);
                return res.redirect('/');
            })
        }
    }

]

