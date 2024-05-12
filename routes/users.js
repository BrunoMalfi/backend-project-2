const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.post("/new", UserController.create);
router.post("/login", UserController.login);
router.get("/", UserController.getAll);
router.get("/getloggeduserdata/:token", UserController.getLoggedUserData);
router.delete("/logout/:id", UserController.logout);
router.get("/getuserbyname/:name", UserController.getUserByName);



module.exports = router;
