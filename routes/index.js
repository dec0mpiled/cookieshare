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
    var authorq="user"+Math.floor(Math.random() * 9999999) + 1 ;
    var contentq=req.body.texxtt;
    var url=req.body.picbox;
    var color="blacK";
    var mynewurl;
    
var myurl=url;

if (myurl!="" && myurl!="admin:001") {
    myurl=myurl.toLowerCase();
if (myurl.startsWith("https://") || myurl.startsWith("http://")) {
    mynewurl=myurl;
} else {
    mynewurl="https://"+myurl;
}
}

if (myurl=="admin:001"){
    mynewurl="";
    authorq="Drew Tarnowski - ShareCookie Admin";
    color="limegreen";
}
   
var mytitle = titleq;
var mynewtitle = mytitle.toLowerCase();
mynewtitle = mynewtitle.replace(badWord,"****");

var mycontent = contentq;
var mynewcontent = mycontent.toLowerCase();
mynewcontent = mynewcontent.replace(badWord,"****");
    
    var newpost = new Post({
        title: mynewtitle,
        author: authorq,
        content: mynewcontent,
        myurl: mynewurl,
        color: color,
        spam: 0,
        created: new Date()
    });
    newpost.save();
    res.redirect('/');
});

module.exports = router;