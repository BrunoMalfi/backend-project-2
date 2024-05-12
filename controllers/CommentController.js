const Comment = require("../models/Comment.js");
const Post = require("../models/Post.js");
const User = require("../models/User.js");

const CommentController = {
    async create(req, res) {
        try {
            const post = req.params.post_id;
            const file = req.file;

            const token = req.headers.authorization;
            const user = await User.findOne({ tokens: token });
            const comment = await Comment.create({
                ...req.body,
                author: user._id,
                post: post,
                file: file.path,
            });
            // await user.updateOne({ $push: { post: post._id } });

            await Post.findByIdAndUpdate(req.params.post_id, {
                $push: { comments: comment._id },
            });

            res.status(201).send({ comment, file });
        } catch (error) {
            console.error(error);
        }
    },
    async getAll(req, res) {
        try {
            const comments = await Comment.find().populate("author");

            res.status(201).send(comments);
        } catch (error) {
            console.error(error);
        }
    },
    async delete(req, res) {
        try {
            await Post.findByIdAndDelete(req.params._id);
            res.send({ message: "Comment deleted" });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: "there was a problem trying to remove the comment",
            });
        }
    },
    async getbyid(req, res) {
        try {
            const comment = await Comment.findById(req.params._id);
            res.status(201).send(comment);
        } catch (error) {
            console.error(error);
        }
    },
    async getbyauthor(req, res) {
        try {
            const author = req.params.author;
            const user = await User.findOne({
                name: author,
            });
            // const comments = user.comments;
            res.status(201).send({
                msg: `Comments of ${req.params.author}:`,
                // ,comments,
            });
            console.log(user);
        } catch (error) {
            console.error(error);
            res.send(500).send({
                msg: "There was a problem trying to get the comments",
            });
        }
    },
    async like(req, res) {
        try {
            const commentId = req.params._id;
            const token = req.headers.authorization;
            const user = await User.findOne({
                tokens: token,
            });
            const userId = user._id;
            const comment = await Comment.findByIdAndUpdate(
                commentId,
                { $push: { likes: userId } },
                { new: true },
            );
            res.send(comment);
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: "There was a problem with your like",
            });
        }
    },
};

module.exports = CommentController;
