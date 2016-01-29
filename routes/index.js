var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
        title: String,
        author: String,
        content: String,
        tags: String,
        spam: Number,
        created: Date
});

var Post = mongoose.model('User', PostSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
    Post.find({}, null, { sort: '-created' }, function (err, posts) {
        if (err) return next(err);
        console.log(posts);
        res.render('index', { title: 'ShareCookie', posts: posts });
    });
});

/* GET help page. */
router.get('/help', function(req, res, next) {
        res.render('help', { title: 'Help'});
});

/* Post Cookie */
router.post('/sharecookie', function(req, res, next) {
    var titleq=req.body.titlebox;
    var authorq=req.body.username;
    var contentq=req.body.texxtt;
    var newpost = new Post({
        title: titleq,
        author: authorq,
        content: contentq,
        spam: 0,
        created: new Date()
    });
    newpost.save();
    res.redirect('/');
});

module.exports = router;