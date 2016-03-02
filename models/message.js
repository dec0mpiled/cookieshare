var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var content = new Schema({ value: String, date: Date, by: String });

var Message = new Schema({
        users: [String],
        _startedby: Schema.Types.ObjectId,
        _touser: Schema.Types.ObjectId,
        contents: [content],
});

module.exports = mongoose.model('messages', Message);