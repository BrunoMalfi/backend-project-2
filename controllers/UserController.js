const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { jwt_secret } = require("../config/keys.js");
const transporter = require("../config/nodemailer");


const UserController = {
    async create(req, res, next) {
        const file = req.file != undefined ? req.file : { path: false };
        try {
            const password = bcrypt.hashSync(req.body.password,10)
            const user = await User.create({...req.body, password:password,avatarPath:file.path});
            const emailToken = jwt.sign({email:req.body.email},jwt_secret,{expiresIn:'48h'})
            const url = 'http://localhost:8080/users/confirm/'+ emailToken
            await transporter.sendMail({
                to: req.body.email,
                subject: "Confirme su registro",
                html: `<h3> Bienvenido ${user.name}, estás a un paso de registrarte </h3>
                <a href="${url}"> Clica para confirmar tu registro</a>
                `,
              });
            res.status(201).send({msg : "New user created", user:{...user._doc,password:"*******"}});        
        } catch (error) {
            console.error(error);
            next(error);
            //  res.status(500).send({
            //      msg: "There was an issue creatring new user",
            //  });
        }
    },
    async confirm(req,res){
        try {
          const token = req.params.emailToken
          const payload = jwt.verify(token,jwt_secret)
          const user = await User.findOne({
                email: payload.email,
            });
          const newUser= await User.findByIdAndUpdate(user._id,{active:true},{ new: true });
          res.status(201).send( {msg:"User has been confirmed",newUser} );
        } catch (error) {
          console.error(error)
          res.send("Error confirming user")
        }
      },    
    async getAll(req, res) {
        try {
            const users = await User.find({}, { password: 0 });
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
    async getLoggedUserData(req, res) {
        res.send({ msg: "Logged user data", user:{...req.user._doc,password:"******",tokens:0} });
    },
    async logout(req, res) {
        const UserId = req.user._id;
        const token = req.headers.authorization;
        try {
            const user = await User.findOne({
                _id: UserId
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
            const user = await User.find({ name }, { password: 0, tokens: 0 });
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
                oldUser: { ...oldUser._doc, password: "******" },
                newUser: { ...newUser._doc, password: "******" },
            });
        } catch (error) {
            console.error(error);
            res.send({ msg: "user with Id: " + req.params.id + " not found" });
        }
    },
    async getUserById(req, res) {
        try {
            const user = await User.findById(req.params.id, {
                password: 0,
                tokens: 0,
            });
            res.send({ msg: "User:", user });
        } catch (error) {
            console.error(error);
            res.send({ msg: "user with Id: " + req.params.id + " not found" });
        }
    },
};
module.exports = UserController;
