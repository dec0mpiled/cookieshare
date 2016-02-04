var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var Post = require('../models/post');
var router = express.Router();

router.get('/register', function(req, res) {
  res.render('a/register', { active: 'register', title: 'Register' });
});

router.get('/login', function(req, res) {
  res.render('a/login', { active: 'login', title: 'Login', user:req.user });
});

router.post('/register', function(req, res, next) {
  User.register(new User({
    username: req.body.username,
    admin: false
  }), req.body.password, function(err, account) {
    if (err) {
      return res.render("a/register", {
        info: "username already exists!",
        active: 'register'
      });
    }
    if (username=="" || username==" " || username=="  " || username=="   "){
  
    }

    passport.authenticate('local')(req, res, function() {
      req.session.save(function(err) {
        if (err) {
          return next(err);
        }
        res.redirect('/');
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