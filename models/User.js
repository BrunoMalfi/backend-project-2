const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema(
    {
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
        role: { type: String, default: "user" },
        birthday: {
            type: Date,
            required: [true, "Please fullfil your birthday date"],
        },
        avatarPath: { type: String },
        tokens: [],
        avatarPath: { type: String },
        active: { type: Boolean, default: false },
        tokens: [],
        avatarPath: { type: String },
        active: { type: Boolean, default: false },
        tokens: [],
        commentsIds: [
            {
                type: ObjectId,
                ref: "Comment",
            },
        ],
        postIds: [
            {
                type: ObjectId,
                ref: "Post",
            },
        ],
    },
    { timestamps: true },
);
UserSchema.methods.toJSON = function() {
    const user = this._doc;
    delete user.tokens;
    delete user.password;
    delete user.__v;
    return user;
}

const User = mongoose.model("User", UserSchema);

module.exports = User;
