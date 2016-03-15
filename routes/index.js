var express = require('express');
var app = express();
var router = express.Router();
var User = require('../models/user');
var Message = require('../models/message');
var Post = require('../models/post');
var marked = require('marked');
//var sanitizeHtml = require('sanitize-html');
var twitter = require('twitter-text');
var mongoose = require('mongoose');
var CryptoJS = require("crypto-js");
var crypto = require("crypto");
var email = require('emailjs');


//var http = require('http').Server(app);
//var io = require('socket.io')(http);

/* home */
router.get('/', function(req, res, next) {
    
    
    /*
    User.update({}, {schange:[]}, {multi:true}, function(err) {
        if (err) throw (err);
    });*/
    /*
    var msg = new Message({
        users: ["drew", "bruh"],
        contents: [({value:"Cool dude", date: new Date(), by:"drew"})],
    });
    msg.save();*/
   /*
   User.update({}, {$push: {schange: {bodycolor:"#FFF"}}}, {multi: true}, function(err) {
        if (err) throw err;
    }); 
    */
    /*
    Post.update({}, {commentslist.dislikes:0}, {multi: true}, function(err) {
        if (err) throw err;
    });*/
 
    
    User.find({}, function(err, users) {
      if (err) return next(err);
      if (req.user) {
          
          console.log(req.user.following);
          
              var notcount=req.user.notamount;
          var limit=20;
          var bcolor;
          
          Post.find({ 'author': { $in: req.user.following } }, null, { sort: '-created'},  function(err, followings) {
            if (err) return next(err);
            res.render('index', { title: 'ShareCookie', filter: 'date', posts: followings, user: req.user, notes:notcount, header:"My Timeline", bcolor:req.user.schange});
          });
        
      } else { 
          Post.find({}, null, { sort: '-created'}, function (err, posts) {
            if (err) return next(err);
            res.render('index', { title: 'ShareCookie', filter: 'date', posts: posts, user: req.user, limit});
          });
      }
      
    });
    
   /* User.count({},  function(err, counted){
     if (err) throw err;   
    Post.find({}, null, { sort: '-created' }, function (err, posts) {
        if (err) return next(err);
        
    }); 
    });*/
});

/* sort by date */
router.get('/filter/date', ensureAuthenticated,function(req, res, next) {
    Post.find({}, null, { sort: '-created' }, function (err, posts) {
        if (err) return next(err);
        res.render('index', { title: 'ShareCookie', filter: 'date', posts: posts, user: req.user });
    });
});

/* sort by likes */
router.get('/public', ensureAuthenticated, function(req, res, next) {
    if (req.user) {
          
              var notcount=req.user.notamount;

    Post.find({locked:false}, null, { sort: '-created' }, function (err, posts) {
        if (err) return next(err);
        res.render('index', { title: 'ShareCookie', filter: 'likes', posts: posts, user: req.user, notes:notcount,  header:"Public Timeline" });
    });
    } else {
        res.redirect("/");
    }
});

/* like comment *//*
router.get('/likecomment/:root/:id/:return/:group', ensureAuthenticated, function(req, res, next) {
    
    User.findById(req.user.id, function(err, doc){
        console.log(doc);
        var nid = req.params.id.toString()
        var nlikes = doc.likes.toString();
        var test = nlikes.indexOf(nid);
        console.log(test);
        if (test<0){
        doc.likes.push({ keys: req.params.root.toString()});
        doc.save();
        
        Post.findOne({ _id: req.params.id }, function (err, docs){
            docs.likes=docs.likes+1;
            if (docs.likes<=-1){
                 docs.color="red";
            } else {
                docs.color="blacK";
            }
            docs.save();
            if (err) throw err;
        User.findOne({username:docs.author}, function(err, doc) {
        if (err) return next(err);
       doc.notamount=doc.notamount+1;
       doc.notifications.unshift({from: req.user.username, type: "like", redirect:req.params.id, mini:marked(docs.content)});
       doc.save();
    });
        });
   
        console.log("done!");
        
        } else if (test>0) {

}
});
});*/

/* Like Post */

router.get('/likepost/:author/:id/:return/:group', ensureAuthenticated, function(req, res, next) {
    
    User.findById(req.user.id, function(err, doc){
        console.log(doc);
        var nid = req.params.id.toString()
        var nlikes = doc.likes.toString();
        var test = nlikes.indexOf(nid);
        console.log(test);
        if (test<0){
        doc.likes.push({ keys: req.params.id.toString()});
        doc.save();
        
        Post.findOne({ _id: req.params.id }, function (err, docs){
            docs.likes=docs.likes+1;
            if (docs.likes<=-1){
                 docs.color="red";
            } else {
                docs.color="blacK";
            }
            docs.save();
            if (err) throw err;
        User.findOne({username:docs.author}, function(err, doc) {
        if (err) return next(err);
       doc.notamount=doc.notamount+1;
       doc.notifications.unshift({from: req.user.username, type: "like", redirect:req.params.id, mini:marked(docs.content)});
       doc.save();
    });
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
            res.redirect('/user/'+req.params.author);
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
            res.redirect('/user/'+req.params.author);
        }
            
        }
        if (err) throw err;
});
});

/* Dislike Post */

router.get('/dislikepost/:author/:id/:return/:group', ensureAuthenticated, function(req, res) {
    User.findById(req.user.id, function(err, doc){
        console.log(doc);
        var nid = req.params.id.toString();
        var nlikes = doc.dislikes.toString();
        var test = nlikes.indexOf(nid);
        console.log(test);
        if (test<0){
        doc.dislikes.push({ keys: req.params.id.toString()});
        doc.save();
        
        Post.findOne({ _id: req.params.id }, function (err, docs){
            docs.dislikes=docs.dislikes+1;
            if (docs.likes<=-1){
                 docs.color="red";
            } else {
                docs.color="blacK";
            }
            docs.save();
            if (err) throw err;
            User.findOne({username:docs.author}, function(err, doc) {
        if (err) return (err);
       doc.notamount=doc.notamount+1;
       doc.notifications.unshift({from: req.user.username, type: "dislike", redirect:req.params.id, mini:marked(docs.content)});
       doc.save();
            });
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
            res.redirect('/user/'+req.params.author);
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
            res.redirect('/user/'+req.params.author);
        }
            
        }
        if (err) throw err;
});
});

router.get('/rebake/:author/:id/:return/:group', function(req, res, next) {
    Post.findOne({"_id":req.params.id}, function(err, cookie) {
        if (err) return next (err);
        console.log(cookie);
    res.render('rebake', {cookie:cookie, user:req.user});
    });
});

router.post('/rbake/:id', function(req, res, next) {
    
    var newid = mongoose.Types.ObjectId();
    
        Post.findOne({ _id: req.params.id }, function (err, docs){
            docs.rebakes=docs.rebakes+1;
            docs.save();
            if (err) throw err;
        User.findOne({username:docs.author}, function(err, doc) {
        if (err) return next(err);
       doc.notamount=doc.notamount+1;
       doc.notifications.unshift({from: req.user.username, type: "rebake", redirect:req.params.id, mini:marked(docs.content)});
       doc.save();
       
       var contentq = req.body.texxtt;
       var group = [];
       
       var hashtags = twitter.extractHashtags(contentq);
    var i
    for (i = 0; i < hashtags.length; i++) { 
    console.log(hashtags[i]);
    var newc = contentq.replace("~"+hashtags[i],"<a style=\"text-decoration:none; color:#6666ff\" href=\"/chip/"+hashtags[i].toLowerCase()+"\">"+"~"+hashtags[i].toLowerCase()+"</a>");
    console.log(newc);
    contentq=newc;
    group.push(hashtags[i]);
    
    }
    console.log(group);
    
    var rawcontent=contentq;
    var usernames = twitter.extractMentions(contentq);
    var i
    for (i = 0; i < usernames.length; i++) { 
    console.log(usernames[i]);
    var newc = contentq.replace("@"+usernames[i],"<a style=\"text-decoration:none; color:#6666ff\" href=\"/user/"+usernames[i]+"\">"+"@"+usernames[i]+"</a>");
    console.log(newc);
    contentq=newc;
    User.findOne({username:usernames[i]}, function(err, doc) {
        if (err) return next(err);
if (doc == null) {
    console.log("fail");
} else {
       doc.notamount=doc.notamount+1;
       doc.notifications.unshift({from: req.user.username, type: "mention", redirect:"/cookie/"+newid, mini:marked(contentq)});
       doc.save();
}
    });
    }
       
       var newpost = new Post({
        //title: mynewtitle,
        _id:newid,
        names: req.user.name+" &nbsp;<i><font size=\"3\" color=\"Black\"><span class=\"glyphicon glyphicon-retweet\" aria-hidden=\"true\"></span>&nbsp; <a style=\"text-decoration:none; color=\"#6666ff\" href=\"/user/"+docs.author+"\">@"+docs.author+"</a></font></i>",
        author: req.user.username,
        _author: req.user.id,
        content: marked(contentq),
        avatarurl: req.user.avatarurl,
        rawcontent: req.body.texxtt,
        myurl: docs.myurl,
        link: docs.gurl,
        color: docs.color,
        group: docs.group,
        spam: 0,
        likes: 0,
        dislikes: 0,
        rebakes: 0,
        commentamount: 0,
        created: new Date(),
    });
    newpost.save();
res.redirect("/");
});
});
});

/* Post Cookie */
router.post('/sharecookie', ensureAuthenticated, function(req, res, next) {
    var badWord = /fuck|shit|cunt|damn|nigger|nigga|twat|dick|cum|tits|titties|boob|boobs|penis|cock|bbc|porn|pornography|rape|sex|orgasm|raping|bitch|ass|clit|clitoris|breast|breasts|wigger|faggot/gi;
    var authorq=req.user.username;
    var contentq = req.body.texxtt;
    var url=req.body.picbox;
    var gurl=req.body.urlbox;
    var color="blacK";
    var group=[];
    var ggroup=req.body.groupbox;
    var mynewurl = req.body.url;
    console.log(mynewurl);
    var id2 = Math.floor(Math.random() * (9999999999 - 1 + 1)) + 1;
    var newid = mongoose.Types.ObjectId();
    
/*
var newname = getUserName(contentq);
console.log(newname);
contentq.replace(newname, "hi");
    */
    
    var hashtags = twitter.extractHashtags(contentq);
    var i
    for (i = 0; i < hashtags.length; i++) { 
    console.log(hashtags[i]);
    var newc = contentq.replace("~"+hashtags[i],"<a style=\"text-decoration:none; color:#6666ff\" href=\"/chip/"+hashtags[i].toLowerCase()+"\">"+"~"+hashtags[i].toLowerCase()+"</a>");
    console.log(newc);
    contentq=newc;
    group.push(hashtags[i]);
    
    }
    console.log(group);
    
    var rawcontent=contentq;
    var usernames = twitter.extractMentions(contentq);
    var i
    for (i = 0; i < usernames.length; i++) { 
    console.log(usernames[i]);
    var newc = contentq.replace("@"+usernames[i],"<a style=\"text-decoration:none; color:#6666ff\" href=\"/user/"+usernames[i]+"\">"+"@"+usernames[i]+"</a>");
    console.log(newc);
    contentq=newc;
    User.findOne({username:usernames[i]}, function(err, doc) {
        if (err) return next(err);
if (doc == null) {
    console.log("fail");
} else {
       doc.notamount=doc.notamount+1;
       doc.notifications.unshift({from: req.user.username, type: "mention", redirect:"/cookie/"+newid, mini:marked(contentq)});
       doc.save();
}
    });
    }
    
    contentq=contentq.replace("bae","babe");
    contentq=contentq.replace("Bae","Babe");
    contentq=contentq.replace("BAE","BABE");
    contentq=contentq.replace("bAe","bAbe");
    contentq=contentq.replace("baE","babE");
    contentq=contentq.replace("BaE","BabE");
    contentq=contentq.replace("bAE","bAbE");
    contentq=contentq.replace("BAe","BAbe");
        
        
    if (req.user.locked==false) {
        var locked=false;
    }
    if (req.user.locked==true){
        var locked=true;
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
console.log(mycontent);
//mynewcontent = mycontent.toLowerCase();
//mynewcontent = mynewcontent.replace(badWord,"****");
    var name = req.user.name;

    var newpost = new Post({
        //title: mynewtitle,
        _id:newid,
        names: name,
        author: authorq,
        _author: req.user.id,
        content: marked(mycontent),
        avatarurl: req.user.avatarurl,
        rawcontent:rawcontent,
        myurl: mynewurl,
        link: gurl,
        color: color,
        group: group,
        spam: 0,
        likes: 0,
        dislikes: 0,
        rebakes: 0,
        locked:locked,
        commentamount: 0,
        created: new Date().toUTCString(),
    });
    newpost.save();
    res.redirect('/');
});


/* Post Cookie */
router.post('/updatecookie/:id', ensureAuthenticated, function(req, res, next) {
    var id=req.params.id;
    var contentq = req.body.texxtt;
    var gurl=req.body.urlbox;
    var color="blacK";
    var mynewurl;
    var group=[];
    var ggroup=req.body.groupbox;
    var rawcontent=contentq;

var gurl=gurl;

if (gurl=="" || gurl==" "){
    gurl="";
}

if (gurl!="") {
if (gurl.startsWith("http://")||gurl.startsWith("https://")) {
    gurl=gurl;
}
}

    var hashtags = twitter.extractHashtags(contentq);
    var i
    for (i = 0; i < hashtags.length; i++) { 
    console.log(hashtags[i]);
    var newc = contentq.replace("~"+hashtags[i],"<a style=\"text-decoration:none; color:#6666ff\" href=\"/chip/"+hashtags[i]+"\">"+"~"+hashtags[i]+"</a>");
    console.log(newc);
    contentq=newc;
    group.push(hashtags[i]);
    
    }

var usernames = twitter.extractMentions(contentq);
    var i
    for (i = 0; i < usernames.length; i++) { 
    console.log(usernames[i]);
    var newc = contentq.replace("@"+usernames[i],"<a style=\"text-decoration:none; color:#6666ff\" href=\"/user/"+usernames[i]+"\">"+"@"+usernames[i]+"</a>");
    console.log(newc);
    contentq=newc;
    User.findOne({username:usernames[i]}, function(err, doc) {
                if (err) return next(err);
if (doc == null) {
    console.log("fail");
} else {
        if (err) return next(err);
       doc.notamount=doc.notamount+1;
       doc.notifications.unshift({from: req.user.username, type: "mentionedit", redirect:"/cookie/"+id, mini:marked(contentq)});
       doc.save();
}
    });
    }

    
    contentq=contentq.replace("bae","babe");
    contentq=contentq.replace("Bae","Babe");
    contentq=contentq.replace("BAE","BABE");
    contentq=contentq.replace("bAe","bAbe");
    contentq=contentq.replace("baE","babE");
    contentq=contentq.replace("BaE","BabE");
    contentq=contentq.replace("bAE","bAbE");
    contentq=contentq.replace("BAe","BAbe");
        

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

Post.findOne({_id:id}, function(err, doc) {
    if (err) return next(err);
    doc.content=marked(mycontent);
    doc.rawcontent=rawcontent;
    doc.group=group;
    doc.link=gurl;

    doc.save();
});
    res.redirect('/');
});


router.get('/cookie/:id', ensureAuthenticated, function(req, res) {
  Post.findOne({ _id: req.params.id }, function(err, result) {
    if (err) throw err;
    if (result== null) {
    console.log("fail");
    res.redirect('/');
} else {
    console.log(result);
    console.log(result.commentlist);
    User.findOne({username:result.author}, function(err, doc) {
        if (err) throw err;
    res.render('post', { title: result.rawcontent, result: result, person:doc, user: req.user });
    });
}
  });
  });
  
  router.get('/chip/:groupid', function(req, res) {
  Post.find({ group: req.params.groupid },null, { sort: '-created' }, function(err, result) {
    if (err) throw err;
    res.render('group', { title: "~"+req.params.groupid, result: result, user: req.user, groupname:req.params.groupid });
    });
  });

router.post("/sendcomment/:id", function(req, res, next) {
    var badWord = /fuck|shit|cunt|damn|nigger|nigga|twat|dick|cum|tits|titties|boob|boobs|penis|cock|bbc|porn|pornography|rape|sex|orgasm|raping|bitch|ass|clit|clitoris|breast|breasts|wigger|faggot/gi;
    var commentval = req.body.commentbox;
    var name=req.user.username;
    var newid = mongoose.Types.ObjectId();
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
    
    var usernames = twitter.extractMentions(commentval);
    var i
    for (i = 0; i < usernames.length; i++) { 
    console.log(usernames[i]);
    var newc = commentval.replace("@"+usernames[i],"<a style=\"text-decoration:none; color:#6666ff\" href=\"/user/"+usernames[i]+"\">"+"@"+usernames[i]+"</a>");
    console.log(newc);
    commentval=newc;
    User.findOne({username:usernames[i]}, function(err, doc) {
        if (err) return next(err);
       doc.notamount=doc.notamount+1;
       doc.notifications.unshift({from: req.user.username, type: "commention", redirect:"/cookie/"+id, mini:marked(commentval)});
       doc.save();
    });
    }
    
    Post.findOne({"_id" : id}, function (err, docs){
        docs.commentslist.push({ _id: newid, value: marked(commentval), likes: 0, dislikes: 0, user: name, _author: req.user.id, created: new Date() });
        docs.commentamount=docs.commentamount+1;
        docs.save();
        if (err) throw err;
    User.findOne({username:docs.author}, function(err, doc) {
        if (err) return next(err);
       doc.notamount=doc.notamount+1;
       doc.notifications.unshift({from: req.user.username, type: "comment", redirect:req.params.id, mini:marked(commentval)});
       doc.save();
    });
});
    res.redirect("/cookie/"+id);
});


/* user page */
router.get('/user/:user', function(req, res, next) {
    
    console.log(req.params.user);
    
    User.findOne({ username: req.params.user }, function(err, usera) {
        console.log(usera);
        if (err) {
            res.redirect('/');
        }
if (usera == null) {
    console.log("fail");
    res.redirect('/');
} else {
        Post.find({ "author": usera.username}, null, { sort: '-created' }, function(err, post) {
            if (err) return next(err);
            if (req.user) {
                if (req.user.username==req.params.user){
                    
                   res.render('me', {user: req.user, title: usera.username, posts: post, posts1: usera.poststo, account: usera});
                } else {
                        User.findById(req.user.id, function(err, doc){
                         var nid = req.params.user.toString();
                         var nlikes = doc.following.toString();
                          var test = nlikes.indexOf(nid);
                           console.log(test);
                               if (test<0){
                                   console.log(usera.locked);
                                   if (usera.locked==true) {
                                     var buttontext="Request Follow";
                                   } else {
                                       var buttontext="Follow";
                                   }
                              } else if (test>=0) {
                           var buttontext="Unfollow";
                      if (err) throw err;
                  }
            res.render('user', {user: req.user, buttontext: buttontext, title: usera.username, posts: post, posts1: usera.poststo, account: usera});
        });
        }   
      } else {
    res.render('user', {user: req.user, title: usera.username, posts: post, posts1: usera.poststo, account: usera});
}
});
}
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
        doc.poststo.push({ keys: marked(commentval), author: req.user.username, _author: req.user.id, created: new Date() });
        doc.notamount=doc.notamount+1;
       doc.notifications.unshift({from: req.user.username, type: "postto", redirect:req.params.id, mini:marked(commentval)});
        doc.save();
        if (err) throw err;
    res.redirect("/user/"+doc.username);
    });
});
///////////////////////////////////////////////////

/* GET settings page. */
router.get('/settings', ensureAuthenticated, function(req, res, next) {
    if (req.user){
    res.render('settings', { title: 'Settings', user: req.user});
    } else {
        res.redirect("/");
    }
});

/* SET profile picture */
router.post('/updatepp/:usera', ensureAuthenticated, function(req, res, next) {
    var value=req.body.url;
    console.log(value);
    User.findOneAndUpdate({ _id: req.params.usera }, { avatarurl: value }, function(err, doc) {
    if (err) throw err;    
    });
    Post.update({_author: req.params.usera}, {avatarurl: req.body.url}, {multi: true}, function(err) {
        if (err) throw err;
    });
    res.redirect('/settings');
});

/* SET profile picture */
router.post('/update/updatecp/:id', ensureAuthenticated, function(req, res, next) {
    var value=req.body.ppbox1;
    console.log(value);
    User.findOneAndUpdate({ _id: req.params.id }, { coverphotourl: value }, function(err, doc) {
    if (err) throw err;    
    });
    res.redirect('/settings');
});

/* do some fucking awesome shit bitches */
router.post('/update/displayName/:id', ensureAuthenticated, function(req, res, next) {
    User.findOneAndUpdate({ _id: req.params.id }, { name: req.body.displayName}, function(err, doc) {
        if (err) throw err;
    });
    Post.update({_author: req.params.id}, {names: req.body.displayName}, {multi: true}, function(err) {
        if (err) throw err;
    });
    res.redirect('/settings');
});

/* do some fucking awesome shit bitches #2 */
router.post('/update/username/:id', ensureAuthenticated, function(req, res, next) {
    User.findOneAndUpdate({ _id: req.params.id }, { username: req.body.displayName }, function(err, doc) {
        if (err) throw err;
    });
    Post.update({_author: req.params.id}, {author: req.body.displayName}, {multi: true}, function(err) {
        if (err) throw err;
    });
    res.redirect('/user/'+req.body.displayName);
});

/* do some fucking awesome shit bitches #3!!!! */
router.post('/update/colour/:id', ensureAuthenticated, function(req, res, next) {
    console.log(req.body.colour);
    User.findOneAndUpdate({ _id: req.params.id }, { themecolor: "#"+req.body.colour }, function(err, doc) {
        if (err) throw err;
    });
    res.redirect('/settings');
});

/* do some fucking awesome shit bitches #4!!!! */
router.post('/update/bio/:id', ensureAuthenticated, function(req, res, next) {
    User.findOneAndUpdate({ _id: req.params.id }, { bio: req.body.bio }, function(err, doc) {
        if (err) throw err;
    });
    res.redirect('/settings');
});

/* do some fucking awesome shit bitches #4!!!! */
router.get('/deleteme/:id', ensureAuthenticated, function(req, res, next) {
    User.findOneAndRemove({ _id: req.params.id }, function(err, post) {
        if (err) return next (err);
    });
    res.redirect('/');
});


/* follow a damn user */
router.get('/Follow/:user', ensureAuthenticated, function(req, res, next) {
    if (req.user){
    
    User.findById(req.user.id, function(err, doc){
        if (err) return next(err);
        
        var nid = req.params.user.toString();
        var nlikes = doc.following.toString();
        var test = nlikes.indexOf(nid);
        
        console.log(test);

            if (test<=0){
                
                doc.following.push(req.params.user);
                
                doc.save();
                console.log(doc);
                
                User.findOne({username:req.params.user}, function(err, doc) {
                    if (err) return next(err);
                    doc.followers.push(req.user.username);
                    console.log(doc);
       doc.notamount=doc.notamount+1;
       doc.notifications.unshift({from: req.user.username, type: "follower", redirect:req.params.id});
       doc.save();
         });
                
                res.redirect('/user/'+req.params.user);
           
                    
            } else if (test>0) {
                res.redirect('/user/'+req.params.user);
            }
        }); 
    } else {
        res.redirect("/");
    }
    });
    
    /* unfollow a damn user */
router.get('/Unfollow/:user', ensureAuthenticated, function(req, res, next) {
    if (req.user){
    User.findOneAndUpdate({username: req.user.username}, {$pull: {following: req.params.user}}, function(err, org) {
        if (err) return next(err);
        User.findOneAndUpdate({username:req.params.user}, {$pull: {followers: req.user.username}}, function(err,org) {
            if (err) return next(err);
        org.save();
        });
});
    res.redirect('/user/'+req.params.user);
    } else {
        res.redirect("/");
    }
});

router.get('/deletecookie/:name/:id', ensureAuthenticated, function(req, res, next) {
    Post.findOneAndRemove({ _id: req.params.id }, function(err, post) {
        if (err) return next(err);
        res.redirect('/');
    });
});

router.get('/deletepostto/:name/:id', ensureAuthenticated, function(req, res, next) {
    User.findOne({username: req.params.name}, function(err, org) {
        if (err) return next(err);
        org.poststo.pull(req.params.id);
        org.save();
        res.redirect('/poststome/'+req.user.username);
    });
});

router.get('/editcookie/:name/:id', ensureAuthenticated, function(req, res, next) {
    if (req.user) {
    Post.findOne({ _id: req.params.id }, function(err, post) {
        if (err) return next(err);
        console.log(post.content);
        res.render('editcookie', {post:post, user:req.user});
    });
    } else {
        res.redirect("/");
    }
});

router.get('/following/:name', ensureAuthenticated, function(req, res, next) {
    if (req.user){
    User.findOne({username: req.params.name}, function(err, doc) {
        if (err) return next(err);
        console.log(doc.following);
        
    res.render('following', {title:"Following", user:req.user, followingsnew:doc.following});
});
} else {
    res.redirect("/");
}
});

router.get('/followers/:name', ensureAuthenticated, function(req, res, next) {
    if (req.user){
   User.findOne({username: req.params.name}, function(err, doc) {
        if (err) return next(err);
        console.log(doc.followers);
        
    res.render('followers', {title:"Followers", user:req.user, followersnew:doc.followers});
});
} else {
    res.redirect("/");
}
}); 

router.get('/notifications', ensureAuthenticated, function(req, res, next) {
    if (req.user){
   User.findOne({username: req.user.username}, function(err, doc) {
        if (err) return next(err);
        doc.notamount=0;
        doc.save();
        console.log(doc.notifications);
    res.render('notifications', {title:"Notifications", user:req.user, notifications:doc.notifications});
});
} else {
    res.redirect("/");
}
}); 

router.get('/clearnotes', ensureAuthenticated, function(req, res, next) {
    if (req.user){
    User.findOne({username:req.user.username}, function(err, doc) {
       if (err) throw err; 
       doc.notifications=[];
       doc.notamount=0;
       doc.save();
    });
    res.redirect('/notifications');
    } else {
        res.redirect("/");
    }
});

router.get('/poststome/:name', ensureAuthenticated, function(req, res, next) {
    if (req.user){
User.findOne({ username: req.params.name }, function(err, usera) {
    if (err) return next(err);
    res.render('poststome', {title:"Posts to Me", posts:usera.poststo, user:req.user});
});
} else {
    res.redirect("/");
}
});

router.get('/posttoel/:name', ensureAuthenticated, function(req, res, next) {
    if (req.user){
User.findOne({ username: req.params.name }, function(err, usera) {
    if (err) return next(err);
    res.render('posttoel', {title:"Posts to "+usera.username, posts:usera.poststo, users:usera, user:req.user});
});
} else {
    res.redirect("/");
}
});

router.get('/followme', ensureAuthenticated, function(req, res, next) {
User.findOne({ username: req.user.username }, function(err, usera) {
    if (err) throw err;
    usera.followers.push(req.user.username);
});
res.redirect('/');
});

router.get('/search', ensureAuthenticated, function(req, res, next) {
    User.find({}, function(err, users) {
        if(err) return next(err);
      res.render('search', {user:req.user, users:users});  
    })

});

router.get('/about', ensureAuthenticated, function(req, res, next) {
      res.render('about', {user:req.user, title:"About ShareCookie"});  

});

router.get('/message/:user', function(req, res, next) {
    Message.findOne({ 'users':  [ req.user.username, req.params.user ] }, function(err, messages) {
        if (err) return next (err);
        User.findOne({'username':req.params.user}, function(err, doc) {
            if (err) return next (err);
    res.render('message', {user:req.user, messages:messages, otro:doc});
});
            
        });
});

router.get('/lockme/:user', function(req, res, next) {
    
    User.findOne({_id:req.params.user}, function(err, doc) {
        if (err) return next(err);
            console.log(doc.locked);
        if (doc.locked===false){
            User.findOneAndUpdate({_id:req.params.user}, {locked:true}, function(err, docs) {
                if(err)return next(err);
            
            Post.update({_author:req.params.user}, {locked:true}, {multi: true}, function(err, users) {
                if (err) return next (err);
            });
            });
        }
        if (doc.locked===true){
            User.findOneAndUpdate({_id:req.params.user}, {locked:false}, function(err, docs) {
                if(err)return next(err);
            
            Post.update({_author:req.params.user}, {locked:false}, {multi: true},  function(err, users) {
                if (err) return next (err);
            });
            });
        }
    });
res.redirect('/settings');
});

/*/*
router.get('/searchfollowing', function(req, res, next) {
    var val=req.body.searchbox;
     User.findOne({username: req.user.username}, function(err, doc) {
         if (err) return next(err);
         var check=doc.following.indexOf("val");
            if (check<0) {
                res.render('following', {title:"Following", message:"User not found!"});
            } else {
                res.redirect("/user/"+val);
            }
     });
});*/

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated())
    return next();
  else
    return res.redirect('/')
}

module.exports = router;