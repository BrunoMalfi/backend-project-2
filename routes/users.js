const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const {authentication} =require("../middleware/authentication.js")

router.post("/new", UserController.create);
router.post("/login", UserController.login);
router.get("/", UserController.getAll);
router.get("/getloggeduserdata/:token", UserController.getLoggedUserData);
router.delete("/logout/:id", UserController.logout);
router.get("/getuserbyname/:name", UserController.getUserByName);
router.put("/updateuserbyid/:id",authentication,UserController.updateUserById);
router.get("/getuserbyid/:id",UserController.getUserById);



module.exports = router;
