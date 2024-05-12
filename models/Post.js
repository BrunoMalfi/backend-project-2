const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please provide a title for this post"],
        },
        content: {
            type: String,
            required: [true, "Please provide content for this post"],
        },
        file: String,
        author: {
            type: ObjectId,
            ref: "User",
            required: true,
        },
        comments: [
            {
                type: ObjectId,
                ref: "Comment",
            },
        ],
        likes: [{ type: ObjectId }],
    },
    { timestamps: true },
);
PostSchema.index({
    title: "text",
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
