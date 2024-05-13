const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        match: [/^[a-zA-Z0-9]+$/, "User name isn't valid"],
        required: [true, "Please fulfill the name field"],
      },  
      password: {
        type: String,
        required: [true, "Please fullfil your password"],
      },  
    email: {
        type: String,
        match: [/.+\@.+\..+/, "This e-mail direction isn't valid"],
       unique: true,
        required: [true, "Fulfill your e-mail direction"],
      },  
    role:{ type: String, default: "user"},
    birthday:{
        type:Date,
        required: [true, "Please fullfil your birthday date"],
    },
    avatarPath:{type:String},
    tokens:[],
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;