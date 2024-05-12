const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { jwt_secret } = require("../config/keys.js");

const UserController = {
    async create(req, res, next) {
        const password = bcrypt.hashSync(req.body.password, 10);
        try {
            const user = await User.create({ ...req.body, password: password });
            res.status(201).send({ msg: "New user created", user });
        } catch (error) {
            console.error(error);
            next(error);
            // res.status(500).send({
            //     msg: "There was an issue creatring new user",
            // });
        }
    },
    async getAll(req, res) {
        try {
            const users = await User.find();
            res.send({ msg: "Users list : ", users });
        } catch (error) {
            console.error(error);
        }
    },
    async login(req, res) {
        const password = bcrypt.hashSync(req.body.password, 10);
        try {
            const user = await User.findOne({
                email: req.body.email,
            });
            const isMatch = bcrypt.compareSync(
                req.body.password,
                user.password,
            );
            if (!isMatch) {
                return res.status(400).send({ msg: "Wrong usser or Password" });
            }
            const token = jwt.sign({ _id: user._id }, jwt_secret);
            if (user.tokens.length > 4) user.tokens.shift();
            user.tokens.push(token);
            await user.save();
            res.send({ msg: "Wellcome " + user.name, token });
        } catch (error) {
            console.error(error);
            res.send({ msg: "User not found " });
        }
    },
    //not working
    async getLoggedUserData(req, res) {
        const token = req.params.token;
        try {
            const user = await User.findOne({
                tokens: token,
            });
            res.send({
                msg: "Logged user data  ",
                user: { ...user._doc, password: "******" },
            });
        } catch (error) {
            console.error(error);
            res.send({ msg: "Token expired " });
        }
    },
    async logout(req, res) {
        const UserId = req.params.id;
        const token = req.headers.authorization;
        try {
            const user = await User.findOne({
                _id: UserId,
                tokens: token,
            });
            await User.findByIdAndUpdate(UserId, {
                $pull: { tokens: token },
            });
            res.send({ msg: "Good bye " + user.name });
        } catch (error) {
            console.error(error);
            res.send({ msg: "UserId or token couldn't be found " });
        }
    },
};
module.exports = UserController;
