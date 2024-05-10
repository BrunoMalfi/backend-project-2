const Comment = require("../models/Comment.js");
const Post = require("../models/Post");

const CommentController = {
    async create(req, res) {
        try {
            const comment = await Comment.create(req.body);
            await Post.findByIdAndUpdate(req.body.postId, {
                $push: { comments: comment._id },
            });

            res.status(201).send({ comment });
        } catch (error) {
            console.error(error);
        }
    },
};

module.exports = CommentController;
