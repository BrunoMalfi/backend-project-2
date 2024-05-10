const Post = require("../models/Post.js");

const PostController = {
    async create(req, res) {
        try {
            const post = await Post.create(req.body);
            res.status(201).send(post);
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: "There was an issue creating new post",
            });
        }
    },
};

module.exports = PostController;
