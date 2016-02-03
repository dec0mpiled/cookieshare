var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var comments = new Schema({ value: String, user: String, _user: String, created: Date });

var Post = new Schema({
        title: String,
        author: String,
        _author: Schema.Types.ObjectId,
        content: String,
        myurl: String,
        color: String,
        likes: Number,
        tags: String,
        spam: Number,
        created: Date,
        commentamount: Number,
        commentslist: [comments],
});

module.exports = mongoose.model('posts', Post);