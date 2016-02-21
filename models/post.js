var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var comments = new Schema({ value: String, likes: Number, user: String, _user: String, created: Date });

var Post = new Schema({
        names: String,
        author: String,
        _author: Schema.Types.ObjectId,
        content: String,
        avatarurl: String,
        rawcontent: String,
        myurl: String,
        link: String,
        color: String,
        likes: Number,
        tags: String,
        spam: Number,
        created: Date,
        group: String,
        commentamount: Number,
        commentslist: [comments],
});

module.exports = mongoose.model('posts', Post);