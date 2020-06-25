var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
  username: String,
})

// auto add functions from passport local mongoose
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);