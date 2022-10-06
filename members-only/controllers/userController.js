const User = require('../models/user');
const Post = require('../models/post');
const {body, validationResult} = require("express-validator");
const async = require("async");
const bcrypt = require("bcrypt");
const { deleteOne } = require('../models/user');
const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
  
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
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            // passwords match! log user in
            return done(null, user)
          } else {
            // passwords do not match!

            return done(null, false, { message: "Incorrect password" })
          }
        })
        
        return done(null, user);
      });
    })
);
  
// //GET request on signup form
// exports.user_signup_get = function(req, res, next){
//   res.render('index', {user: req.user});
// }

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

// exports.user_login_post = function(req, res, next){
//   res.send("test");
// }

//POST request for login form

exports.user_login_post = [
  body('password', 'password cannot be empty')
    .trim()
    .isLength({min:1})
    .escape(),
    (req, res, next) => {
      const errors = validationResult(req);
      
      if(!errors.isEmpty()){
        return res.render("login");
      }
      next();
    },
];
  // try{
  //   const username = req.body.username;
  //   const password = req.body.password;
    
  //   const item = User.find(u => u.username === username);

  //   if (item){
  //     passport.authenticate("local", (req, res, function(){
  //       res.redirect('/');
  //     }))
  //   } else {
  //     res.redirect('/signup');
  //   }
  // } catch (err) {
  //   res.send(err);
  // }
// };

// app.post('/login/password',
// passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
// function(req, res) {
//   res.redirect('/~' + req.user.username);
// });
  

  // if (!req.body.username) {
  //   res.json({ success: false, message: "Username was not given" })
  // }
  // else if (!req.body.password) {
  //     res.json({ success: false, message: "Password was not given" })
  // }
  // else {
  //     passport.authenticate("local", function (err, user, info) {
  //       successRedirect: "/",
  //       failureRedirect: "/"  
  //       // if (err) {
          //     res.json({ success: false, message: err });
          // }
          // else {
          //     if (!user) {
          //         res.json({ success: false, message: "username or password incorrect" });
          //     }
          //     else {
          //         const token = jwt.sign({ userId: user._id, username: user.username }, secretkey, { expiresIn: "24h" });
          //         res.json({ success: true, message: "Authentication successful", token: token });
          //     }
          // }
//       });
//   }
// }



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
