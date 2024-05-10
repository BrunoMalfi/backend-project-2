const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please provide a title for this post"],
        },
        content: String,
        file: String,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true },
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
