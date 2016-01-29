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
        created: Date,
});

var Post = mongoose.model('User', PostSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
    Post.find({}, null, { sort: '-created' }, function (err, posts) {
        if (err) return next(err);
        res.render('index', { title: 'ShareCookie', posts: posts });
    });
});

/* GET help page. */
router.get('/help', function(req, res, next) {
        res.render('help', { title: 'Help'});
});

/* Post Cookie */
router.post('/sharecookie', function(req, res, next) {
    var badWord = /fuck|shit|cunt|damn|nigger|nigga|twat|dick|cum|tits|titties|boob|boobs|penis|cock|bbc|porn|pornography|rape|sex|orgasm|tit|raping|bitch|ass|clit|clitoris|breast|breasts|wigger/gi;
    var titleq=req.body.titlebox;
    var authorq=req.body.username;
    var contentq=req.body.texxtt;
    
    if(authorq=="drew") {
        authorq="vanilla";
    }
    
    if(authorq=="admin.name#1") {
        authorq="drew";
    }
    
var mytitle = titleq;
var mynewtitle = mytitle.toLowerCase();
mynewtitle = mynewtitle.replace(badWord,"****");
    
var myauthor = authorq;
var mynewauthor = myauthor.toLowerCase();
mynewauthor = mynewauthor.replace(badWord,"****");

var mycontent = contentq;
var mynewcontent = mycontent.toLowerCase();
mynewcontent = mynewcontent.replace(badWord,"****");
mynewcontent = mynewcontent.replace("!",". Fuck!");
    
    var newpost = new Post({
        title: mynewtitle,
        author: mynewauthor,
        content: mynewcontent,
        spam: 0,
        created: new Date()
    });
    newpost.save();
    res.redirect('/');
});

module.exports = router;