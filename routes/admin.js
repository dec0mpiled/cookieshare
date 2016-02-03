var express = require('express');
var router = express.Router();

var Post = require('../models/post');
var User = require('../models/user');

// get admin homepage
router.get('/', function(req, res, next) {
    User.findOne({ _id: req.user.id }, function(err, user) {
        if (!user.admin) {
            return res.redirect('/');
        } else {
            Post.find({}, function(err, posts) {
                if (err) return next(err);
                User.find({}, function(err, users) {
                    if (err) return next(err);
                    res.render('a/admin', {
                        user: req.user,
                        users: users,
                        posts: posts
                    })
                }); 
            });
        }
    })
})

/// USER MANAGEMENT

// add admin

// remove admin

// remove user

/// POST MANAGEMENT

// update post

// remove post

