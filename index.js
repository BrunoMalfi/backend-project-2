const express = require("express");
const path = require('path');
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const { dbConnection } = require("./config/config");
const cors = require("cors");
const staticDir = path.join("./uploads");

const { handleTypeError } = require("./middleware/errors");

app.use(express.json());
app.use(cors());
app.use('/static', express.static(staticDir));

dbConnection();

app.use("/users", require("./routes/users.js"));
app.use("/posts", require("./routes/posts.js"));
app.use("/comments", require("./routes/comments.js"));
app.use("/image", require("./routes/images.js"));



//app.use(handleTypeError);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

module.exports = app;
