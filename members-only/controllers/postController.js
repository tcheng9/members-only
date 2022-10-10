const Post = require('../models/post');
const {body, validationResult} = require('express-validator');
const async = require('async');

//GET request for create post form

exports.form_get = (req, res, next) => {
    res.render('post','');
}

//POST request for create post form

exports.form_post = [
    // body('body', 'Body cannot be empty')
    //     .trim()
    //     .isLength({min:1})
    //     .escape(),
    // body('title', 'Title cannot be empty')
    //     .trim()
    //     .isLength({min:1})
    //     .escape(),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()){
            return res.send("error");
        }

        if (!req.user){
            return res.send("user is required");
        }

        const post = new Post({
            title: req.body.title,
            text: req.body.body,
            user: req.user
        });

        post.save(function(err){
            if(err) {
                return next(err);
            }
            res.redirect('/');
        });
    }
];


//GET request for posts
exports.posts_list = function(req, res, next){
    PostModel.find({}, "title text timestamp author")
        .exec(function(err, list){
            if(err){
                return next(err);
            } else {
                res.render("index", {
                    title: "Clothes List",
                    postSubmission: list,
                    
                });
            }
        })
}

//POST request for posts