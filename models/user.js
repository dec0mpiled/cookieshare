var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var likekeys = new Schema({ keys: String });
var dislikekeys = new Schema({ keys: String });
var postkeys = new Schema({ keys: String, author: String, created: Date });
var notes = new Schema({ from: String, type: String, redirect: String, mini:String});

var User = new Schema({
    name: String,
    username: String,
    password: String,
    unhash: String,
    email: String,
    admin: Boolean,
    status: String,
    following: [String],
    followers: [String],
    notifications: [notes],
    notamount: Number,
    avatarurl: String,
    coverphotourl: String,
    themecolor: String,
    bio: String,
    poststo: [postkeys],
    likes: [likekeys],
    dislikes: [dislikekeys]
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('userslist', User);