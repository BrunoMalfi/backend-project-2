const express = require("express");
const app = express();
const PORT = 8080;
const { dbConnection } = require("./config/config")

app.use(express.json())

dbConnection()

app.use("/users",require("./routes/users.js"))

app.listen(PORT, ()=> console.log(`Server listening on port ${PORT}`));