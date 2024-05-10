const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    surname:String,
    password: String,
    email: String,
    role:String,
    birthday: Date
    
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;