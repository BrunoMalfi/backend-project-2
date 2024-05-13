const Post = require("../models/Post.js");
const User = require("../models/User.js");
const PostController = {
    async create(req, res) {
        try {
            const file = req.file;
            const user = req.user;

            const post = await Post.create({
                ...req.body,
                file: file.path,
                userId: user._id,
            });

            res.status(201).send(post);
        } catch (error) {
            res.send(error);
        }
    },
    async getAll(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const posts = await Post.find()
                .populate("commentsIds")
                .populate("userId", (select = "name"))
                .limit(limit)
                .skip((page - 1) * limit);
            res.send(posts);
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: "There was an issue finding the posts",
            });
        }
    },
    async getById(req, res) {
        try {
            const post = await Post.findById(req.params._id)
                .populate("commentsIds")
                .populate("userId", (select = "name"));
            res.send(post);
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: `There was an issue finding the post with id ${req.params._id}`,
            });
        }
    },
    async update(req, res) {
        try {
            const file = req.file;
            const post = await Post.findByIdAndUpdate(
                req.params._id,
                req.body,
                {
                    new: true,
                },
            );
            res.status(200).send({ msg: "Post uptaded", post, file });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: "There was an issue updating the post",
            });
        }
    },
    async delete(req, res) {
        try {
            const post = await Post.findByIdAndDelete(req.params._id);
            res.send({ message: "Post deleted", post });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: "there was a problem trying to remove the post",
            });
        }
    },
    async getPostsBytitle(req, res, next) {
        try {
            const posts = await Post.find({
                $text: {
                    $search: req.params.title,
                },
            });
            res.send({ msg: "finded posts", posts });
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: `There was an issue finding the post with title ${req.params.title} `,
            });
        }
    },
    async count(req, res) {
        try {
            const count = await Post.countDocuments();
            res.status(200).send({ msg: `actualmente hay ${count} posts ` });
        } catch (error) {
            res.status(500).send({
                message: "There was an issue counting the posts",
            });
        }
    },
    async like(req, res) {
        try {
            const postId = req.params._id;
            const user = req.user;
            const userId = user._id;
            const post = await Post.findById(postId);

            const liked = post.likes.includes(userId);
            let update;
            if (liked) {
                update = { $pull: { likes: userId } };
            } else {
                update = { $push: { likes: userId } };
            }
            const updatedPost = await Post.findByIdAndUpdate(postId, update, {
                new: true,
            });

            res.send(updatedPost);
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: "There was a problem with your like",
            });
        }
    },
};
module.exports = PostController;
