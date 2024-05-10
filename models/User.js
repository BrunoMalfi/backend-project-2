const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    surname:String,
    role:String,
    score:Number
    
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;