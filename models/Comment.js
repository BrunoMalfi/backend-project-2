const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const CommentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: [true, "This field is required"],
        },
        file: String,
        author: String,
        // {
        //     type: ObjectId,
        //     ref: "User",
        //     required: [true, "You must be logged in to comment  "],
        // },
        post: String,
        // {
        //     type: ObjectId,
        //     ref: "Post",
        //     required: true,
        // },
    },
    { timestamps: true },
);
const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
