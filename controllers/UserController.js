const User = require("../models/User.js");

const UserController ={
    async create(req,res){
        try {
            const product = await User.create(req.body)
            res.status(201).send(product)
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'There was an issue creatring new user' })
        }
    },
}
module.exports = UserController;