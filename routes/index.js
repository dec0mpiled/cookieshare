var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var classtype;

var comments = new Schema({ value: String, user: String, created: Date });

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
        commentamount: Number,
        commentslist: [comments]
});

var Post = mongoose.model('User', PostSchema);

/* home */
router.get('/', function(req, res, next) {

    Post.find({}, null, { sort: '-created' }, function (err, posts) {
        if (err) return next(err);
        res.render('index', { title: 'ShareCookie', filter: 'date', posts: posts, user: req.user });
    });
    
});

/* sort by date */
router.get('/filter/date', function(req, res, next) {

    Post.find({}, null, { sort: '-created' }, function (err, posts) {
        if (err) return next(err);
        res.render('index', { title: 'ShareCookie', filter: 'date', posts: posts, user: req.user });
    });
});

/* sort by likes */
router.get('/filter/likes', function(req, res, next) {

    Post.find({}, null, { sort: '-likes' }, function (err, posts) {
        if (err) return next(err);
        res.render('index', { title: 'ShareCookie', filter: 'likes', posts: posts, user: req.user });
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
        if (doc.likes<=-1){
        doc.color="red";
        } else {
            doc.color="blacK";
        }
        doc.save();
        if (err) throw err;
    });
    res.redirect('/');
});

/* Dislike Post */

router.get('/dislikepost/:id', function(req, res) {
    Post.findOne({ _id: req.params.id }, function (err, doc){
        doc.likes=doc.likes-1;
        if (doc.likes<=-1){
        doc.color="red";
        } 
        if (doc.likes<-15){
            doc.remove();
        }
        if (doc.likes>=0){
            doc.color="blacK";
        }
        doc.save();
        if (err) throw err;
    });
    res.redirect('/');
});

/* Post Cookie */
router.post('/sharecookie', function(req, res, next) {
    var badWord = /fuck|shit|cunt|damn|nigger|nigga|twat|dick|cum|tits|titties|boob|boobs|penis|cock|bbc|porn|pornography|rape|sex|orgasm|raping|bitch|ass|clit|clitoris|breast|breasts|wigger|faggot/gi;
    var titleq=req.body.titlebox;
    var authorq=req.user.username;
    var contentq=req.body.texxtt;
    var url=req.body.picbox;
    var color="blacK";
    var mynewurl;
    var mynewcontent;
    var mynewtitle;
    
var myurl=url;

if (myurl=="" || myurl==" "){
    mynewurl="http://www.reddoorrealtyatlanta.com/wp-content/themes/reddoorrealtyatlanta.com/images/no-image-available.jpg";
}

if (myurl!="") {
if (myurl.startsWith("http://")) {
    mynewurl=myurl;
}

if (myurl.endsWith(".gif")){
    mynewurl=myurl;
} else {
    mynewurl="/images/void.jpg";
}
    
}

if (titleq.endsWith("/admin:001")){
    var newtitleq=titleq.slice(0,titleq.indexOf("/admin:001"));
    authorq="drew";
}
   
if (titleq.endsWith("/admin:001")){
    mynewtitle = newtitleq;
    mynewtitle = mynewtitle.replace(":)","😊");
    mynewtitle = mynewtitle.replace(":D","😄");
    mynewtitle = mynewtitle.replace(":(","😔");
    mynewtitle = mynewtitle.replace(":*","😘");
    mynewtitle = mynewtitle.replace(":|","😐");
    mynewtitle = mynewtitle.replace(":>","😌");
    mynewtitle = mynewtitle.replace(":&","😏");
    mynewtitle = mynewtitle.replace(";)","😉");
    mynewtitle = mynewtitle.replace("xD"||"XD","😂");
    mynewtitle = mynewtitle.replace(":P"||":p","😛");
    
    mynewcontent=contentq;
    mynewcontent = mynewcontent.replace(":)","😊");
    mynewcontent = mynewcontent.replace(":D","😄");
    mynewcontent = mynewcontent.replace(":(","😔");
    mynewcontent = mynewcontent.replace(":*","😘");
    mynewcontent = mynewcontent.replace(":|","😐");
    mynewcontent = mynewcontent.replace(":>","😌");
    mynewcontent = mynewcontent.replace(":&","😏");
    mynewcontent = mynewcontent.replace(";)","😉");
    mynewcontent = mynewcontent.replace("xD"||"XD","😂");
    mynewcontent = mynewcontent.replace(":P"||":p","😛");
} else {
var mytitle = titleq;
// Emojis!!
mytitle = mytitle.replace(":)","😊");
mytitle = mytitle.replace(":D","😄");
mytitle = mytitle.replace(":(","😔");
mytitle = mytitle.replace(":*","😘");
mytitle = mytitle.replace(":|","😐");
mytitle = mytitle.replace(":>","😌");
mytitle = mytitle.replace(":&","😏");
mytitle = mytitle.replace(";)","😉");
mytitle = mytitle.replace("xD"||"XD","😂");
mytitle = mytitle.replace(":P"||":p","😛");

mynewtitle = mytitle.toLowerCase();
mynewtitle = mynewtitle.replace(badWord,"****");

var mycontent = contentq;
// Emojis!!
mycontent = mycontent.replace(":)","😊");
mycontent = mycontent.replace(":D","😄");
mycontent = mycontent.replace(":(","😔");
mycontent = mycontent.replace(":*","😘");
mycontent = mycontent.replace(":|","😐");
mycontent = mycontent.replace(":>","😌");
mycontent = mycontent.replace(":&","😏");
mycontent = mycontent.replace(";)","😉");
mycontent = mycontent.replace("xD"||"XD","😂");
mycontent = mycontent.replace(":P"||":p","😛");

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
        likes: 1,
        commentamount: 0,
        created: new Date(),
    });
    newpost.save();
    res.redirect('/');
});

router.get('/cookie/:id', function(req, res) {
  Post.findOne({ _id: req.params.id }, function(err, result) {
    if (err) throw err;
    res.render('post', { title: "Cookie from ShareCookie!", result: result, user: req.user });
    });
  });

router.post("/sendcomment/:id", function(req, res, next) {
    var badWord = /fuck|shit|cunt|damn|nigger|nigga|twat|dick|cum|tits|titties|boob|boobs|penis|cock|bbc|porn|pornography|rape|sex|orgasm|raping|bitch|ass|clit|clitoris|breast|breasts|wigger|faggot/gi;
    var commentval = req.body.commentbox;
    var name=req.user.username;
    commentval = commentval.replace(":)","😊");
    commentval = commentval.replace(":D","😄");
    commentval = commentval.replace(":(","😔");
    commentval = commentval.replace(":*","😘");
    commentval = commentval.replace(":|","😐");
    commentval = commentval.replace(":>","😌");
    commentval = commentval.replace(":&","😏");
    commentval = commentval.replace(";)","😉");
    commentval = commentval.replace("xD"||"XD","😂");
    commentval = commentval.replace(":P"||":p","😛");
    var mynewcomment = commentval.toLowerCase();
    var newcomq = mynewcomment.replace(badWord,"****");
    commentval=newcomq;
    var id=req.params.id;
    Post.findOne({"_id" : id}, function (err, doc){
        doc.commentslist.push({ value: commentval, user: name, created: new Date() });
        doc.commentamount=doc.commentamount+1;
        doc.save();
        if (err) throw err;
});
    res.redirect("/cookie/"+id);
});

module.exports = router;