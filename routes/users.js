const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.post("/new", UserController.create);
router.post("/login", UserController.login);
router.get("/", UserController.getAll);
router.get("/getloggeduserdata/:token", UserController.getLoggedUserData);


module.exports = router;
