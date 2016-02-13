var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var likekeys = new Schema({ keys: String });
var dislikekeys = new Schema({ keys: String });
var postkeys = new Schema({ keys: String, author: String, created: Date });

var User = new Schema({
    name: String,
    username: String,
    password: String,
    admin: Boolean,
    following: [String],
    followers: [String],
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