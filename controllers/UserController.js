const User = require("../models/User.js");

const UserController = {
    async create(req, res) {
        try {
            const user = await User.create(req.body);
            res.status(201).send(user);
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: "There was an issue creatring new user",
            });
        }
    },
    async getAll(req, res) {
        try {
            const users = await User.find();
            res.send(users);
        } catch (error) {
            console.error(error);
        }
    },
}; 
module.exports = UserController;
g