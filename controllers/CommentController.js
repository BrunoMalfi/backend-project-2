const Comment = require("../models/Comment.js");
const Post = require("../models/Post.js");
const User = require("../models/User.js");

const CommentController = {
    async create(req, res, next) {
        try {
            const user = req.user;
            const post = req.params.postId;
            const comment = await Comment.create({
                ...req.body,
                userId: user._id,
                postId: post,
            });
            await User.findByIdAndUpdate(req.user._id, {
                $push: { commentsIds: comment._id },
            });
            await Post.findByIdAndUpdate(post, {
                $push: { commentsIds: comment._id },
            });

            res.status(201).send({ msg: "your comment:", comment });
        } catch (error) {
            next(error);
        }
    },
    async getAll(req, res) {
        try {
            const comments = await Comment.find().populate(
                "userId",
                (select = "name"),
            );

            res.status(201).send(comments);
        } catch (error) {
            res.send(500).send({
                msg: "There was a problem trying to get the comments",
            });
        }
    },
    async delete(req, res) {
        try {
            await Comment.findByIdAndDelete(req.params._id);
            await User.findByIdAndUpdate(
                req.user._id,
                { $pull: { commentsIds: req.params._id } },
                { new: true },
            );
            res.send({ message: "Comment deleted" });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                msg: "there was a problem trying to remove the comment",
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
                msg: "There was a problem with your like",
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
                console.log(liked);
                return res.status(400).send("There is no like on this comment");
            }
            const likedComment = await Comment.findByIdAndUpdate(
                req.params._id,
                { $pull: { likes: userId } },
                { new: true },
            );
            console.log(liked);

            res.send(likedComment);
        } catch (error) {
            console.error(error);
            res.status(500).send({
                msg: "There was a problem with your like",
                error,
            });
        }
    },
    async update(req, res, next) {
        try {
            // const file = req.file;
            const comment = await Comment.findByIdAndUpdate(req.params._id, {
                new: true,
            });
            res.status(200).send({ msg: "Comment uptaded", comment });
        } catch (error) {
            next(error);
        }
    },
};

module.exports = CommentController;
