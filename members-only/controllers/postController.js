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

