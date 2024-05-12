const Comment = require("../models/Comment.js");
const Post = require("../models/Post.js");
const User = require("../models/User.js");

const CommentController = {
    async create(req, res) {
        try {
            const token = req.headers.authorization;
            const user = await User.findOne({ tokens: token });
            const comment = await Comment.create({
                ...req.body,
                author: user._id,
            });
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
