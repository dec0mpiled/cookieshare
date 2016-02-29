var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var comments = new Schema({ value: String, likes: Number, user: String, _user: String, created: Date });

var Post = new Schema({
        id2: Number,
        names: String,
        author: String,
        bakedby: String,
        _author: Schema.Types.ObjectId,
        content: String,
        avatarurl: String,
        rawcontent: String,
        myurl: String,
        link: String,
        color: String,
        likes: Number,
        dislikes: Number,
        rebakes: Number,
        tags: String,
        spam: Number,
        created: Date,
        group: [String],
        locked: Boolean,
        commentamount: Number,
        commentslist: [comments],
});

module.exports = mongoose.model('posts', Post);