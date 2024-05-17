const User = require("../models/User.js");
const Post = require("../models/Post.js");
const Comment = require("../models/Comment.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET } = process.env;

const authentication = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const payload = jwt.verify(token, JWT_SECRET);
        const user = await User.findOne({ _id: payload._id, tokens: token });
        if (!user) {
            return res.status(401).send({ msg: "User not autorithed" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .send({ error, msg: "There was a problem with the token" });
    }
};
const isAdmin = async (req, res, next) => {
    const admins = ["admin", "superadmin"];
    if (!admins.includes(req.user.role)) {
        return res.status(403).send({
            message: "No tienes permisos",
        });
    }
    next();
};

const isCommentAuthorOrAdmin = async (req, res, next) => {
    try {
        const admins = ["admin", "superadmin"];
        const comments = await Comment.findById(req.params._id);

        if (admins.includes(req.user.role)) {
            return next();
        }

        if (comments.userId.toString() === req.user._id.toString()) {
            return next();
        }

        return res.status(403).send({ message: "No tienes permisos" });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            error,
            message:
                "Ha habido un problema al comprobar la autoría del comment",
        });
    }
};

const isAuthorOrAdmin = async (req, res, next) => {
    try {
        const admins = ["admin", "superadmin"];
        const post = await Post.findById(req.params._id);

        if (admins.includes(req.user.role)) {
            return next();
        }

        if (post.userId.toString() === req.user._id.toString()) {
            return next();
        }

        return res.status(403).send({ message: "No tienes permisos" });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            error,
            message: "Ha habido un problema al comprobar la autoría del post",
        });
    }
};

module.exports = { authentication, isCommentAuthorOrAdmin, isAuthorOrAdmin };
