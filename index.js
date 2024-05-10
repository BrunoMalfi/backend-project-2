const express = require("express");
const app = express();
const PORT = 8080;
const { dbConnection } = require("./config/config");
<<<<<<< HEAD
const { handleTypeError } = require("./middleware/errors.js");
=======
const { handleTypeError } = require("./middleware/errors");
>>>>>>> bruno

app.use(express.json());

dbConnection();

app.use("/users", require("./routes/users.js"));
app.use("/posts", require("./routes/posts.js"));

app.use(handleTypeError);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
