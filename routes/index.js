var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Post = require('../models/post');

/* home */
router.get('/', function(req, res, next) {
    
   /*User.update({}, {$push: {following:"sharecookie"} }, {multi: true}, function(err) {
        if (err) throw err;
    }); */
    
    User.find({}, function(err, users) {
      if (err) return next(err);
      if (req.user) {
          console.log(req.user.following);
          
              var notcount=req.user.notamount;
          
          Post.find({ 'author': { $in: req.user.following } }, null, { sort: '-created' },  function(err, followings) {
            if (err) return next(err);
            res.render('index', { title: 'ShareCookie', filter: 'date', posts: followings, user: req.user, notes:notcount});
          });
        
      } else { 
          Post.find({}, null, { sort: '-created' }, function (err, posts) {
            if (err) return next(err);
            res.render('index', { title: 'ShareCookie', filter: 'date', posts: posts, user: req.user});
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
router.get('/filter/date', function(req, res, next) {

    Post.find({}, null, { sort: '-created' }, function (err, posts) {
        if (err) return next(err);
        res.render('index', { title: 'ShareCookie', filter: 'date', posts: posts, user: req.user });
    });
});

/* sort by likes */
router.get('/public', function(req, res, next) {
          
              var notcount=req.user.notamount;

    Post.find({}, null, { sort: '-created' }, function (err, posts) {
        if (err) return next(err);
        res.render('index', { title: 'ShareCookie', filter: 'likes', posts: posts, user: req.user, notes:notcount });
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
        User.findOne({username:doc.author}, function(err, doc) {
        if (err) return next(err);
       doc.notamount=doc.notamount+1;
       doc.notifications.unshift({from: req.user.username, type: "like", redirect:req.params.id});
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

router.get('/dislikepost/:author/:id/:return/:group', function(req, res) {
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
            User.findOne({username:doc.author}, function(err, doc) {
        if (err) return (err);
       doc.notamount=doc.notamount+1;
       doc.notifications.unshift({from: req.user.username, type: "dislike", redirect:req.params.id});
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

/* Post Cookie */
router.post('/sharecookie', function(req, res, next) {
    var badWord = /fuck|shit|cunt|damn|nigger|nigga|twat|dick|cum|tits|titties|boob|boobs|penis|cock|bbc|porn|pornography|rape|sex|orgasm|raping|bitch|ass|clit|clitoris|breast|breasts|wigger|faggot/gi;
    var authorq=req.user.username;
    var contentq = req.body.texxtt;
    var url=req.body.picbox;
    var gurl=req.body.urlbox;
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
        link: gurl,
        color: color,
        group: group,
        spam: 0,
        likes: 0,
        commentamount: 0,
        created: new Date(),
    });
    newpost.save();
    res.redirect('/');
});


/* Post Cookie */
router.post('/updatecookie/:id', function(req, res, next) {
    var id=req.params.id;
    var contentq = req.body.texxtt;
    var url=req.body.picbox;
    var gurl=req.body.urlbox;
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

var gurl=gurl;

if (gurl=="" || gurl==" "){
    gurl="";
}

if (gurl!="") {
if (gurl.startsWith("http://")||gurl.startsWith("https://")) {
    gurl=gurl;
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

Post.findOne({_id:id}, function(err, doc) {
    if (err) return next(err);
    doc.content=mycontent;
    doc.myurl=mynewurl;
    doc.group=group;
    doc.link=gurl;

    doc.save();
});
    res.redirect('/');
});


router.get('/cookie/:id', function(req, res) {
  Post.findOne({ _id: req.params.id }, function(err, result) {
    if (err) throw err;
    if (result== null) {
    console.log("fail");
    res.redirect('/');
} else {
    User.findOne({username:result.author}, function(err, doc) {
        if (err) throw err;
    res.render('post', { title: "ShareCookie Post by "+result.names, result: result, person:doc, user: req.user });
    });
}
  });
  });
  
  router.get('/group/:groupid', function(req, res) {
  Post.find({ group: req.params.groupid },null, { sort: '-created' }, function(err, result) {
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
    User.findOne({username:doc.author}, function(err, doc) {
        if (err) return next(err);
       doc.notamount=doc.notamount+1;
       doc.notifications.unshift({from: req.user.username, type: "comment", redirect:req.params.id});
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
                      var buttontext="Follow";
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
        doc.poststo.push({ keys: commentval, author: req.user.username, _author: req.user.id, created: new Date() });
        doc.notamount=doc.notamount+1;
       doc.notifications.unshift({from: req.user.username, type: "postto", redirect:req.params.id});
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

/* SET profile picture */
router.post('/updatepp/:usera', function(req, res, next) {
    var value=req.body.ppbox;
    console.log(value);
    User.findOneAndUpdate({ username: req.user.username }, { avatarurl: value }, function(err, doc) {
    if (err) throw err;    
    });
    res.redirect('/settings');
});

/* SET profile picture */
router.post('/update/updatecp/:id', function(req, res, next) {
    var value=req.body.ppbox1;
    console.log(value);
    User.findOneAndUpdate({ _id: req.params.id }, { coverphotourl: value }, function(err, doc) {
    if (err) throw err;    
    });
    res.redirect('/settings');
});

/* do some fucking awesome shit bitches */
router.post('/update/displayName/:id', function(req, res, next) {
    User.findOneAndUpdate({ _id: req.params.id }, { name: req.body.displayName}, function(err, doc) {
        if (err) throw err;
    });
    Post.update({_author: req.params.id}, {names: req.body.displayName}, {multi: true}, function(err) {
        if (err) throw err;
    });
    res.redirect('/settings');
});

/* do some fucking awesome shit bitches #2 */
router.post('/update/username/:id', function(req, res, next) {
    User.findOneAndUpdate({ _id: req.params.id }, { username: req.body.displayName }, function(err, doc) {
        if (err) throw err;
    });
    Post.update({_author: req.params.id}, {author: req.body.displayName}, {multi: true}, function(err) {
        if (err) throw err;
    });
    res.redirect('/user/'+req.body.displayName);
});

/* do some fucking awesome shit bitches #3!!!! */
router.post('/update/colour/:id', function(req, res, next) {
    console.log(req.body.colour);
    User.findOneAndUpdate({ _id: req.params.id }, { themecolor: "#"+req.body.colour }, function(err, doc) {
        if (err) throw err;
    });
    res.redirect('/settings');
});

/* do some fucking awesome shit bitches #4!!!! */
router.post('/update/bio/:id', function(req, res, next) {
    User.findOneAndUpdate({ _id: req.params.id }, { bio: req.body.bio }, function(err, doc) {
        if (err) throw err;
    });
    res.redirect('/settings');
});

/* follow a damn user */
router.get('/Follow/:user', function(req, res, next) {
    
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
    });
    
    /* follow a damn user */
router.get('/Unfollow/:user', function(req, res, next) {
    User.findOneAndUpdate({username: req.user.username}, {$pull: {following: req.params.user}}, function(err, org) {
        if (err) return next(err);
        User.findOneAndUpdate({username:req.params.user}, {$pull: {followers: req.user.username}}, function(err,org) {
            if (err) return next(err);
        org.save();
        });
});
    res.redirect('/user/'+req.params.user);
});

router.get('/deletecookie/:name/:id', function(req, res, next) {
    Post.findOneAndRemove({ _id: req.params.id }, function(err, post) {
        if (err) return next(err);
        res.redirect('/user/'+req.params.name);
    });
});

router.get('/deletepostto/:name/:id', function(req, res, next) {
    User.findOne({username: req.params.name}, function(err, org) {
        if (err) return next(err);
        org.poststo.pull(req.params.id);
        org.save();
        res.redirect('/user/'+req.params.name);
    });
});

router.get('/editcookie/:name/:id', function(req, res, next) {
    Post.findOne({ _id: req.params.id }, function(err, post) {
        if (err) return next(err);
        res.render('editcookie', {post:post, user:req.user});
    });
});

router.get('/following/:name', function(req, res, next) {
    User.findOne({username: req.params.name}, function(err, doc) {
        if (err) return next(err);
        console.log(doc.following);
        
    res.render('following', {title:"Following", user:req.user, followingsnew:doc.following});
});
});

router.get('/followers/:name', function(req, res, next) {
   User.findOne({username: req.params.name}, function(err, doc) {
        if (err) return next(err);
        console.log(doc.followers);
        
    res.render('followers', {title:"Followers", user:req.user, followersnew:doc.followers});
});
}); 

router.get('/notifications', function(req, res, next) {
   User.findOne({username: req.user.username}, function(err, doc) {
        if (err) return next(err);
        doc.notamount=0;
        doc.save();
        console.log(doc.notifications);
    res.render('notifications', {title:"Notifications", user:req.user, notifications:doc.notifications});
});
}); 

router.get('/clearnotes', function(req, res, next) {
    User.findOne({username:req.user.username}, function(err, doc) {
       if (err) throw err; 
       doc.notifications=[];
       doc.notamount=0;
       doc.save();
    });
    res.redirect('/notifications');
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


module.exports = router;