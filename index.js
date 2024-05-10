const express = require("express");
const app = express();
const PORT = 8080;
const { dbConnection } = require("./config/config");
const { handleTypeError } = require("./middleware/errors.js");

app.use(express.json());

dbConnection();

app.use("/users", require("./routes/users.js"));
app.use("/posts", require("./routes/posts.js"));
app.use("/comments", require("./routes/comments.js"));

app.use(handleTypeError);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
