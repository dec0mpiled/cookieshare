var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
        title: String,
        author: String,
        content: String,
        myurl: String,
        color: String,
        likes: Number,
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

/* Like Post */

router.get('/likepost/:id', function(req, res) {
    Post.findOne({ _id: req.params.id }, function (err, doc){
        doc.likes=doc.likes+1;
        doc.save();
        if (err) throw err;
    });
    res.redirect('/');
});

/* Dislike Post */

router.get('/dislikepost/:id', function(req, res) {
    Post.findOne({ _id: req.params.id }, function (err, doc){
        doc.likes=doc.likes-1;
        doc.save();
        if (err) throw err;
    });
    res.redirect('/');
});

/* Post Cookie */
router.post('/sharecookie', function(req, res, next) {
    var badWord = /fuck|shit|cunt|damn|nigger|nigga|twat|dick|cum|tits|titties|boob|boobs|penis|cock|bbc|porn|pornography|rape|sex|orgasm|raping|bitch|ass|clit|clitoris|breast|breasts|wigger|faggot/gi;
    var titleq=req.body.titlebox;
    var authorq="user"+Math.floor(Math.random() * 9999999) + 1 ;
    var contentq=req.body.texxtt;
    var url=req.body.picbox;
    var color="blacK";
    var mynewurl;
    var mynewcontent;
    var mynewtitle;
    
var myurl=url;

if (myurl!="") {
    myurl=myurl.toLowerCase();
if (myurl.startsWith("https://") || myurl.startsWith("http://")) {
    mynewurl=myurl;
} else {
    mynewurl="http://"+myurl;
}
}

if (titleq.endsWith("/admin:001")){
    var newtitleq=titleq.slice(0,titleq.indexOf("/admin:001"));
    authorq="Drew Tarnowski - ShareCookie Admin";
    color="limegreen";
}
   
if (titleq.endsWith("/admin:001")){
    mynewtitle = newtitleq;
    mynewcontent=contentq;
} else {
var mytitle = titleq;
mynewtitle = mytitle.toLowerCase();
mynewtitle = mynewtitle.replace(badWord,"****");

var mycontent = contentq;
mynewcontent = mycontent.toLowerCase();
mynewcontent = mynewcontent.replace(badWord,"****");
}
    
    var newpost = new Post({
        title: mynewtitle,
        author: authorq,
        content: mynewcontent,
        myurl: mynewurl,
        color: color,
        spam: 0,
        likes: 0,
        created: new Date()
    });
    newpost.save();
    res.redirect('/');
});

module.exports = router;