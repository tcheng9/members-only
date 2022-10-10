const Post = require('../models/post');
const {body, validationResult} = require('express-validator');
const async = require('async');

//GET request for create post form

exports.form_get = (req, res, next) => {
    res.send('post a message page')
}

//POST request for create post form

exports.form_post = (req, res, next) => {
    res.send('FORM POST FUNCTION');
};


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