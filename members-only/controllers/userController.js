const User = require('../models/user');
const Post = require('../models/post');
const {body, validationResult} = require("express-validator");
const async = require("async");
const bcrypt = require("bcrypt");
const { deleteOne } = require('../models/user');
const passport = require('passport');

//GET request on signup form
exports.user_signup_get = function(req, res, next){

}

//Setting up passport
passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) { 
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        if (user.password !== password) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
      });
    })
  );
  
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
  

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
            res.render('index', {
                title: "You have been logged in successfully",
                user,
                errors: errors.array(),
            });
        } else {
            user.save((err) => {
                if (err) return next(err);
                res.redirect('/');
            })
        }
    }

]


//POST request for login form

exports.user_login_post = [
    async (req, res, next) => {
        passport.authenticate("local", {
            successRedirect: "/",
            failureRedirect: "/"
        });
    }
]

// exports.user_login_post = [
//     body('username', 'username cannot be empty')
//         .trim()
//         .isLength({min:1})
//         .escape(),
//     body('password', 'password cannot be empty')
//         .trim()
//         .isLength({min:1})
//         .escape(),
//     async (req, res, next) => {
//         const username = req.body.username;
//         const password = req.body.password;
        
//         const item = User.find(u => u.username === username)
        
//         if (!item) {
//             res.send("no user");
            
//         }

//         // try {
//         //     if(await bcrypt.compare(password, item.password)) {
//         //         res.send("success")
//         //     }
//         // } catch {
//         //     res.send('failure');
//         // }
        

//         // if (!isValid){
//         //     res.send("wrong password");
            
//         // } else {
//         //     res.send("correct password");
//         // }

//         // res.send("here");

//     }
// ]
