const Comment = require("../models/Comment.js");
const Post = require("../models/Post.js");
const User = require("../models/User.js");

const CommentController = {
    async create(req, res) {
        try {
            const user = req.user;
            const post = req.params.postId;
            const comment = await Comment.create({
                ...req.body,
                userId: user._id,
                postId: post,
                author: user.name,
            });
            await User.findByIdAndUpdate(req.user._id, {
                $push: { commentsIds: comment._id },
            });

            res.status(201).send({ user });
        } catch (error) {
            return console.log(error);
        }
    },
    async getAll(req, res) {
        try {
            const comments = await Comment.find().populate("userId");

            res.status(201).send(comments);
        } catch (error) {
            res.send(500).send({
                msg: "There was a problem trying to get the comments",
            });
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
            res.send(500).send({
                msg: "There was a problem trying to get the comments",
            });
        }
    },
    async getbyuser(req, res) {
        try {
            const user = req.params.user;
            const comments = await Comment.find({
                $text: {
                    $search: user,
                },
            });

            res.status(201).send({ msg: `comments of ${user}: `, comments });
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
            const user = req.user;
            const userId = user._id;
            const comment = await Comment.findById(commentId);
            const liked = comment.likes.includes(userId);
            if (liked) {
                return res
                    .status(400)
                    .send("You alredy put like on this comment");
            }
            const likedComment = await Comment.findByIdAndUpdate(
                req.params._id,
                { $push: { likes: userId } },
                { new: true },
            );
            res.send(likedComment);
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: "There was a problem with your like",
                error,
            });
        }
    },
    async unlike(req, res) {
        try {
            const commentId = req.params._id;
            const user = req.user;
            const userId = user._id;
            const comment = await Comment.findById(commentId);
            const liked = comment.likes.includes(userId);
            if (!liked) {
                return res.status(400).send("There is no like on this comment");
            }
            const likedComment = await Comment.findByIdAndUpdate(
                req.params._id,
                { $pull: { likes: userId } },
                { new: true },
            );
            res.send(likedComment);
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: "There was a problem with your like",
                error,
            });
        }
    },
    async update(req, res) {
        try {
            const file = req.file;
            const comment = await Comment.findByIdAndUpdate(
                req.params._id,
                req.body,
                {
                    new: true,
                },
            );
            res.status(200).send({ msg: "Comment uptaded", comment, file });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: "There was an issue updating the post",
            });
        }
    },
};

module.exports = CommentController;
