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
    async getAll(req, res) {
        try {
            const comments = await Comment.find();

            res.status(201).send(comments);
        } catch (error) {
            console.error(error);
        }
    },
};

module.exports = CommentController;
