const express = require("express");
const router = express.Router();
const PostController = require("../controllers/PostController");
const { imageLoad } = require("../middleware/multer");
const { authentication, isAuthor } = require("../middleware/authentication");

router.post("/", imageLoad, authentication, PostController.create);
router.get("/", PostController.getAll);
router.get("/id/:_id", authentication, PostController.getById);
router.put(
    "/id/:_id",
    imageLoad,
    authentication,
    isAuthor,
    PostController.update,
);
router.put("/like/:_id", authentication, PostController.like);

router.get("/total", PostController.count);
router.get("/title/:title", PostController.getPostsBytitle);
router.delete("/id/:_id", authentication, PostController.delete);

module.exports = router;
