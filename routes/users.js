const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.post("/new", UserController.create);
router.get("/", UserController.getAll);

module.exports = router;
