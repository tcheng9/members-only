const User = require('../models/user');
const Post = require('../models/post');
const {body, validationResult} = require("express-validator");
const async = require("async");
const bcrypt = require("bcrypt");
const passport = require('passport');
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

//Get request for login form

exports.user_login_get = (req, res) => {
    res.render('login', {title: 'Login', user: res.locals.currentUser});
}


//POST request for login form

exports.user_login_post = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  });


  //GET request membership signup
exports.membership_get = (req,res,next) => {
    res.send("membership get");
}

  //POST request for mmebership signup
exports.membership_post = (req, res, next) => {
    res.send("membership POST");
}