const Post = require("../models/Post.js");

const PostController = {
    async create(req, res, next) {
        try {
            // const file = req.file;
            const post = await Post.create({
                ...req.body,
                // file: file.filepath,
                // userId: req.user._id,
            });
            res.status(201).send(post, console.log(file));
        } catch (error) {
            console.error(error);
            res.status(500).send(next(error));
        }
    },
    async getAll(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const posts = await Post.find()
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
            const post = await Post.findById(req.params._id);
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
            const post = await Post.findByIdAndUpdate(
                req.params._id,
                req.body,
                {
                    new: true,
                },
            );
            res.status(200).send({ msg: "Post uptaded", post });
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
};
module.exports = PostController;
