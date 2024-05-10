const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please provide a title for this post"],
        },
        content: String,
        file: String,
        // userId: {
        //     type: ObjectId,
        //     ref: "User",
        //     required: true,
        // },
    },
    { timestamps: true },
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
