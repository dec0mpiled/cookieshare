var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var likekeys = new Schema({ keys: String });
var dislikekeys = new Schema({ keys: String });
var postkeys = new Schema({ keys: String, author: String, created: Date });

var User = new Schema({
    username: String,
    password: String,
    admin: Boolean,
    poststo: [postkeys],
    likes: [likekeys],
    dislikes: [dislikekeys]
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('userslist', User);