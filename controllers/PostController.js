const Post = require("../models/Post.js");

const PostController = {
    async create(req, res, next) {
        try {
            const post = await Post.create({
                ...req.body,
                // userId: req.user._id,
            });
            res.status(201).send(post);
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: "There was an issue creating new post",
            });
        }
    },
    async getAll(req, res) {
        try {
            const posts = await Post.find();
            res.send(posts);
        } catch (error) {
            console.error(error);
        }
    },
    async getById(req, res) {
        try {
            const post = await Post.findById(req.params.id);
            res.send(post);
        } catch (error) {
            console.error(error);
        }
    },
    async update(req, res, next) {
        try {
            const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
            });
            res.status(200).send({ msg: "Post updated", post });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: "There was an issue updating the post",
            });
        }
    },
};
module.exports = PostController;
