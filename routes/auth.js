var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var Post = require('../models/post');
var router = express.Router();
var crypto = require("crypto");

router.get('/register', function(req, res) {
  res.render('a/register', { active: 'register', title: 'Register' });
});

router.get('/login', function(req, res) {
  res.render('a/login', { active: 'login', title: 'Login', user:req.user });
});

router.post('/register', function(req, res, next) {
  var username=req.body.username.replace(/[^\x00-\x7F]/g, "");
   if (username=="" || username==" " || username=="  " || username=="   "){
    return res.render("a/register", {
        info: "username cannot be blank!",
        active: 'register'
      });
    }
    var x = req.body.emailbox;
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
        res.render("a/register",{info: 'invalid email address!'});
        return;
    } else {
      var email=x;
    }
    
    function encrypt(text){
  var cipher = crypto.createCipher('aes-256-cbc','d6F3Efeq')
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  console.log(crypted);
  return crypted;
}

  User.register(new User({
    name: req.body.namebox,
    username: username,
    email: email,
    unhash: encrypt(req.body.password),
    notamount: 0,
    messamount: 0,
    locked: false,
    status: "none",
    following: ["drew", "sharecookie", "ShareCookieAds", username, "owebboy", "todaysholiday"],
    followers: ["sharecookie"],
    bio: "No Bio Available",
    avatarurl: "https://medium.com/img/default-avatar.png",
    admin: false
  }), req.body.password, function(err, account) {
    if (err) {
      return res.render("a/register", {
        info: "username already exists!",
        active: 'register'
      });
    }
    User.findOne({username: "drew"}, function(err,doc) {
      if (err) throw err;
      doc.followers.push(username);
       doc.notamount=doc.notamount+1;
       doc.notifications.unshift({from: username, type: "follower", redirect:username});
      doc.save();
    });
        User.findOne({username: "owebboy"}, function(err,doc) {
      if (err) throw err;
      doc.followers.push(username);
       doc.notamount=doc.notamount+1;
       doc.notifications.unshift({from: username, type: "follower", redirect:username});
      doc.save();
    });
    
      User.findOne({username: "todaysholiday"}, function(err,doc) {
      if (err) throw err;
      doc.followers.push(username);
       doc.notamount=doc.notamount+1;
       doc.notifications.unshift({from: username, type: "follower", redirect:username});
      doc.save();
    });
    
        User.findOne({username: "sharecookie"}, function(err,doc) {
      if (err) throw err;
      doc.followers.push(username);
       doc.notamount=doc.notamount+1;
       doc.notifications.unshift({from: username, type: "follower", redirect:username});
      doc.save();
    });
User.findOne({username: username}, function(err,doc) {
      if (err) throw err;
       doc.notamount=doc.notamount+2;
       doc.notifications.unshift({from: "ShareCookie", type: "welcome", redirect:username});
       doc.notifications.unshift({from: "sharecookie", type: "follower", redirect:"sharecookie"});
      doc.save();
    });
    passport.authenticate('local')(req, res, function() {
      req.session.save(function(err) {
        if (err) {
          return next(err);
        }
        res.redirect('/notifications');
      });
    });
  });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    Post.find({}, null, { sort: '-created' }, function (err, posts) {
        if (err) return next(err);
    if (!user) { return res.render("index", { info: "username and password do not match!", active: 'login', title: 'ShareCookie', posts:posts }); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      var hour = 3600000;
      req.session.cookie.maxAge = 14 * 24 * hour; //2 weeks
      return res.redirect('/');
    });
    });
  })(req, res, next);
});

router.get('/logout', function(req, res, next) {
  req.logout();
  req.session.save(function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

// update
router.post('/update', function (req, res, next) {
  User.findOneAndUpdate({ _id: req.user.id }, {
    name: req.body.name,
    email: req.body.email,
    username: req.body.username
  }, function (err, account) {
    if (err) return next(err);
    res.redirect('/');
  });
});

module.exports = router;