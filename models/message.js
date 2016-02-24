var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Message = new Schema({
  content: String,
  date: Date,
  author: String,
  color: String
});

module.exports = mongoose.model('messages', Message);