const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const {authentication} =require("../middleware/authentication.js")
const {imageLoad} =require('../middleware/multer.js')

router.post("/new",imageLoad,UserController.create);
router.post("/login", UserController.login);
router.get("/", UserController.getAll);
router.get("/getloggeduserdata",authentication, UserController.getLoggedUserData);
router.delete("/logout",authentication,UserController.logout);
router.get("/getuserbyname/:name", UserController.getUserByName);
router.put("/updateuserbyid/:id",authentication,imageLoad,UserController.updateUserById);
router.get("/getuserbyid/:id",UserController.getUserById);



module.exports = router;
