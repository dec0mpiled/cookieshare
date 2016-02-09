var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Post = require('../models/post');

var twitter = require('twitter-text');

/* home */
router.get('/', function(req, res, next) {
    
    User.count({},  function(err, counted){
     if (err) throw err;   

    Post.find({}, null, { sort: '-created' }, function (err, posts) {
        if (err) return next(err);
        res.render('index', { title: 'ShareCookie', filter: 'date', posts: posts, user: req.user, howmany:counted });
    });
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

router.get('/likepost/:author/:id/:return/:group', function(req, res, next) {
    User.findById(req.user.id, function(err, doc){
        console.log(doc);
        var nid = req.params.id.toString()
        var nlikes = doc.likes.toString();
        var test = nlikes.indexOf(nid);
        console.log(test);
        if (test<0){
        doc.likes.push({ keys: req.params.id.toString()});
        doc.save();
        
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
        if (req.params.return=="home"){
        res.redirect('/');
        };
        if (req.params.return=="cookie"){
        res.redirect('/cookie/'+req.params.id);
        };
        if (req.params.return=="group"){
        res.redirect('/group/'+req.params.group);
        };
        if (req.params.return=="user"){
        User.findById(req.user.id, function(err, doc){
            if (err) throw err;
            var newname=doc.username;
            console.log(newname);
            res.redirect('/user/'+newname);
        });
        }
        console.log("done!");
        
        } else if (test>0) {
            console.log("cant like again!");
                    if (req.params.return=="home"){
        res.redirect('/');
        };
        if (req.params.return=="cookie"){
        res.redirect('/cookie/'+req.params.id);
        };
        if (req.params.return=="group"){
        res.redirect('/group/'+req.params.group);
        };
        if (req.params.return=="user"){
        User.findById(req.user.id, function(err, doc){
            if (err) throw err;
            var newname=doc.username;
            console.log(newname);
            res.redirect('/user/'+newname);
        });
        }
            
        }
        if (err) throw err;
});
});

/* Dislike Post */

router.get('/dislikepost/:author/:id/:group', function(req, res) {
    User.findById(req.user.id, function(err, doc){
        console.log(doc);
        var nid = req.params.id.toString();
        var nlikes = doc.dislikes.toString();
        var test = nlikes.indexOf(nid);
        console.log(test);
        if (test<0){
        doc.dislikes.push({ keys: req.params.id.toString()});
        doc.save();
        
        Post.findOne({ _id: req.params.id }, function (err, doc){
            doc.likes=doc.likes-1;
            if (doc.likes<=-1){
                 doc.color="red";
            } else {
                doc.color="blacK";
            }
            doc.save();
            if (err) throw err;
        });
        if (req.params.return=="home"){
        res.redirect('/');
        };
        if (req.params.return=="cookie"){
        res.redirect('/cookie/'+req.params.id);
        };
        if (req.params.return=="group"){
        res.redirect('/group/'+req.params.group);
        };
        if (req.params.return=="user"){
        User.findById(req.user.id, function(err, doc){
            if (err) throw err;
            var newname=doc.username;
            console.log(newname);
            res.redirect('/user/'+newname);
        });
        }
        console.log("done!");
        
        } else if (test>0) {
            console.log("cant dislike again!");
        if (req.params.return=="home"){
        res.redirect('/');
        };
        if (req.params.return=="cookie"){
        res.redirect('/cookie/'+req.params.id);
        };
        if (req.params.return=="group"){
        res.redirect('/group/'+req.params.group);
        };
        if (req.params.return=="user"){
        User.findById(req.user.id, function(err, doc){
            if (err) throw err;
            var newname=doc.username;
            console.log(newname);
            res.redirect('/user/'+newname);
        });
        }
            
        }
        if (err) throw err;
});
});

/* Post Cookie */
router.post('/sharecookie', function(req, res, next) {
    var badWord = /fuck|shit|cunt|damn|nigger|nigga|twat|dick|cum|tits|titties|boob|boobs|penis|cock|bbc|porn|pornography|rape|sex|orgasm|raping|bitch|ass|clit|clitoris|breast|breasts|wigger|faggot/gi;
    var authorq=req.user.username;
    var contentq = req.body.texxtt;
    var url=req.body.picbox;
    var color="blacK";
    var mynewurl;
    var ggroup=req.body.groupbox;
    
    if (ggroup!="") {
        var group=ggroup;
    } else {
         var group="";
    }
    
var myurl=url;

if (myurl=="" || myurl==" "){
    mynewurl="";
}

if (myurl!="") {
if (myurl.startsWith("http://")||myurl.startsWith("https://")) {
    mynewurl=myurl;
}
}

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

//mynewcontent = mycontent.toLowerCase();
//mynewcontent = mynewcontent.replace(badWord,"****");
    var name = req.user.name;

    var newpost = new Post({
        //title: mynewtitle,
        names: name,
        author: authorq,
        _author: req.user.id,
        content: mycontent,
        myurl: mynewurl,
        color: color,
        group: group,
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
    res.render('post', { title: result.content, result: result, user: req.user });
    });
  });
  
  router.get('/group/:groupid', function(req, res) {
  Post.find({ group: req.params.groupid }, function(err, result) {
    if (err) throw err;
    res.render('group', { title: req.params.groupid, result: result, user: req.user, groupname:req.params.groupid });
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
    //var mynewcomment = commentval.toLowerCase();
    //var newcomq = mynewcomment.replace(badWord,"****");
    //commentval=newcomq;
    var id=req.params.id;
    Post.findOne({"_id" : id}, function (err, doc){
        doc.commentslist.push({ value: commentval, likes: 0, user: name, _author: req.user.id, created: new Date() });
        doc.commentamount=doc.commentamount+1;
        doc.save();
        if (err) throw err;
});
    res.redirect("/cookie/"+id);
});


/* user page */
router.get('/user/:user', function(req, res, next) {
    User.findOne({ username: req.params.user }, function(err, usera) {
        if (err) return next(err);
        Post.find({ "author": usera.username }, null, { sort: '-created' }, function(err, post) {
            console.log(post);
           if (err) return next(err);
           res.render('user', {user: req.user, title: usera.username, posts: post, posts1: usera.poststo, account: usera });
});
});
});

////////////////////// Stuck /////////////////////
router.post("/sendtouser/:id", function(req, res, next) {
    var badWord = /fuck|shit|cunt|damn|nigger|nigga|twat|dick|cum|tits|titties|boob|boobs|penis|cock|bbc|porn|pornography|rape|sex|orgasm|raping|bitch|ass|clit|clitoris|breast|breasts|wigger|faggot/gi;
    var commentval = req.body.msgbox;
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
    //var mynewcomment = commentval.toLowerCase();
    //var newcomq = mynewcomment.replace(badWord,"****");
    //commentval=newcomq;
    var id=req.params.id;
    console.log(req.body.msgbox);
    User.findOne({"_id" : id}, function (err, doc){
        console.log(doc.username);
        doc.poststo.push({ keys: commentval, author: req.user.username, _author: req.user.id, created: new Date() });
        doc.save();
        if (err) throw err;
    res.redirect("/user/"+doc.username);
    });
});
///////////////////////////////////////////////////

/* GET settings page. */
router.get('/settings', function(req, res, next) {
    res.render('settings', { title: 'Settings', user: req.user});
});

module.exports = router;