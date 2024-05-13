const express = require("express");
const router = express.Router();
const PostController = require("../controllers/PostController");
const { imageLoad } = require("../middleware/multer");
const { authentication } = require("../middleware/authentication");

router.post("/", imageLoad, authentication, PostController.create);
router.get("/", PostController.getAll);
router.get("/id/:_id", PostController.getById);
router.put("/id/", imageLoad, authentication, PostController.update);
router.put("/like/:_id", PostController.like);

router.get("/total", PostController.count);
router.get("/title/:title", PostController.getPostsBytitle);
router.delete("/id/:_id", PostController.delete);

module.exports = router;
