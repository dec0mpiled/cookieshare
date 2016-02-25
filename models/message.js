var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Message = new Schema({
  user: Schema.Types.ObjectId,
  messages: {
    content: String,
    date: Date,
    author: String,
    color: String
  }
});

Message.plugin(require('mongoose-findorcreate'));

module.exports = mongoose.model('messages', Message);