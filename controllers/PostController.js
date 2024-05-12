const Post = require("../models/Post.js");
const User = require("../models/User.js");
const PostController = {
    async create(req, res) {
        try {
            const file = req.file;
            const token = await req.headers.authorization;
            const user = await User.findOne({
                tokens: token,
            });
            const post = await Post.create({
                ...req.body,
                file: file.path,
                author: user._id,
            });

            res.status(201).send({ post });
        } catch (error) {
            console.error(error);
        }
    },
    async getAll(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const posts = await Post.find()
                .populate({
                    path: "comments",
                    populate: {
                        path: "author",
                        select: "name",
                    },
                })
                .populate("author", (select = "name"))
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
                .populate({
                    path: "comments",
                    populate: {
                        path: "author",
                        select: "name",
                    },
                })
                .populate("author", (select = "name"));
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
            const token = req.headers.authorization;
            const user = await User.findOne({
                tokens: token,
            });
            const userId = user._id;
            const post = await Post.findByIdAndUpdate(
                postId,
                { $push: { likes: userId } },
                { new: true },
            );
            res.send(post);
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: "There was a problem with your like",
            });
        }
    },
};
module.exports = PostController;
