const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const { JWT_SECRET,DOMAIN,PORT } = process.env;
const transporter = require("../config/nodemailer");

const UserController = {
    async create(req, res, next) {
        const file = req.file != undefined ? req.file : { path: false };
        try {
            const password = bcrypt.hashSync(req.body.password, 10);
            const user = await User.create({
                ...req.body,
                password: password,
                avatarPath: file.path,
            });
            const emailToken = jwt.sign({ email: req.body.email }, JWT_SECRET, {
                expiresIn: "48h",
            });
            const url = DOMAIN+"/users/confirm/" + emailToken;
            await transporter.sendMail({
                to: req.body.email,
                subject: "Activate your account",
                html: `<h3> Hi  ${user.name}, </h3><p> Thank you for signing up for uour social network. Click on the link below to verify your email:</p> 
                <a href="${url}">link</a>
                <p>This link will expire in 48 hours</p>
                `,
            });
            res.status(201).send({ msg: "New user created", user });
        } catch (error) {
            console.error(error);
            next(error);
            //  res.status(500).send({
            //      msg: "There was an issue creatring new user",
            //  });
        }
    },
    async confirm(req, res) {
        try {
            const token = req.params.emailToken;
            const payload = jwt.verify(token, JWT_SECRET);
            const user = await User.findOne({
                email: payload.email,
            });
            const newUser = await User.findByIdAndUpdate(
                user._id,
                { active: true },
                { new: true },
            );
            res.status(201).send(
                "User has been confirmed. Wellcome " + newUser.name,
            );
        } catch (error) {
            console.error(error);
            res.send("Error confirming user");
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
            if (!user.active) {
                return res
                    .status(400)
                    .send({
                        message:
                            "Please, confirm first your e-mail direction and then try to login",
                    });
            }
            const token = jwt.sign({ _id: user._id }, JWT_SECRET);
            if (user.tokens.length > 4) user.tokens.shift();
            user.tokens.push(token);
            await user.save();
            res.send({ msg: "Wellcome " + user.name, token });
        } catch (error) {
            console.error(error);
            res.send({ msg: "User not found " });
        }
    },
    async getLoggedUserData(req, res) {
        const user = await User.findById(req.user._id)
        .populate("commentsIds")
        .populate("postIds")
        .populate("followersIds")
        .populate("followingListIds")
        res.send({ msg: "Logged user data", user });
    },
    async logout(req, res) {
        const UserId = req.user._id;
        const token = req.headers.authorization;
        try {
            const user = await User.findOne({
                _id: UserId,
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
    async getUserByName(req, res, next) {
        try {
            if (req.params.name.length > 20) {
                return res.status(400).send("Name to long");
            }
            const name = new RegExp(req.params.name, "i");
            const user = await User.find({ name });
            if (user.length == 0) {
                res.send({
                    msg: "User with name " + req.params.name + " not found",
                });
            } else if (user.length == 1) {
                res.send({ msg: "User found : ", user });
            } else {
                res.send({ msg: "Users found : ", user });
            }
        } catch (error) {
            next(error);
            console.log(error);
        }
    },
    async updateUserById(req, res, next) {
        try {
            const oldUser = await User.findById(req.params.id);
            let file = req.file != undefined ? req.file : { path: false };
            file = file.path ? file : oldUser.avatarPath;
            const newUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    ...req.body,
                    password: oldUser.password,
                    avatarPath: file.path,
                },
                { new: true },
            );
            res.send({
                msg: "User successfully updated",
                oldUser,
                newUser,
            });
        } catch (error) {
            console.error(error);
            res.send({ msg: "user with Id: " + req.params.id + " not found" });
        }
    },
    async getUserById(req, res) {
        try {
            const user = await User.findById(req.params.id);
            res.send({ msg: "User:", user });
        } catch (error) {
            console.error(error);
            res.send({ msg: "user with Id: " + req.params.id + " not found" });
        }
    },
    async recoverPassword(req, res) {
        try {
            const recoverToken = jwt.sign(
                { email: req.params.email },
                JWT_SECRET,
                {
                    expiresIn: "48h",
                },
            );
            const url =
                "http://localhost:3000/users/resetPassword/" + recoverToken;
            await transporter.sendMail({
                to: req.params.email,
                subject: "Password reset",
                html: `<h3> Pasword reset </h3>
                    <a href="${url}">Reset password link</a>
                    <p>This link will expire in 48 hours</p>`,
            });
            res.send({
                msg: "Reset password e-mail sent",
            });
        } catch (error) {
            console.error(error);
        }
    },
    async resetPassword(req, res) {
        try {
            const recoverToken = req.params.recoverToken;
            const payload = jwt.verify(recoverToken, JWT_SECRET);
            const password = bcrypt.hashSync(req.body.password, 10);
            const userUpdated = await User.findOneAndUpdate(
                { email: payload.email },
                { password },
            );
            res.send({
                msg: "Password from user " + userUpdated.name + " updated",
            });
        } catch (error) {
            console.error(error);
        }
    },
    async followUserById(req, res, next) {
        try{
            const userToFollow = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $push: { followersIds: req.user._id },
                },
                { new: true },
            );
            const userFollower = await User.findByIdAndUpdate(
                req.user._id,
                {
                    $push: { followingListIds: req.params.id },
                },
                { new: true },
            );
            res.send({
                msg: "User " + userFollower.name + " is now following " + userToFollow.name ,
                userToFollow,
                userFollower
            });
        }catch(error){
            console.error(error);
        }
        
    },
};
module.exports = UserController;
