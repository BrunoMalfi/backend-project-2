const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const CommentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: [true, "This field is required"],
        },
        file: String,
        userId: {
            type: ObjectId,
            ref: "User",
            required: [true, "You must be logged in to comment  "],
        },
        post: {
            type: ObjectId,
            ref: "Post",
            required: true,
        },
        likes: [{ type: ObjectId }],
    },
    { timestamps: true },
);
const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
