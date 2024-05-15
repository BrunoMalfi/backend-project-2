const mongoose = require("mongoose");
require("dotenv").config();

const { MONGO_URI } = process.env;

const dbConnection = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Succesful Data Base connection");
    } catch (error) {
        console.error(error);
        throw new Error("Error connecting to the Data Base");
    }
};

module.exports = {
    dbConnection,
};
