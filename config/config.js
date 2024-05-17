const mongoose = require("mongoose");
require("dotenv").config();

const { MONGO_URI } = process.env;
const { MONGO_TEST } = process.env;

const dbConnection = async () => {
    try {
        if (process.env.NODE_ENV === "test") {
            await mongoose.connect(MONGO_TEST);
            console.log(
                "Succesful Data Base connection to",
                process.env.NODE_ENV,
            );
        } else {
            await mongoose.connect(MONGO_URI);
            console.log(
                "Succesful Data Base connection to",
                process.env.NODE_ENV,
            );
        }
    } catch (error) {
        console.error(error);
        throw new Error("Error connecting to the Data Base");
    }
};

module.exports = {
    dbConnection,
};
