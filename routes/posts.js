const express = require("express");
const router = express.Router();
const PostController = require("../controllers/PostController");
const { imageLoad } = require("../middleware/multer");
const {
    authentication,
    isAuthorOrAdmin,
} = require("../middleware/authentication");

router.post("/", imageLoad, authentication, PostController.create);
router.get("/", PostController.getAll);
router.get("/id/:_id", PostController.getById);
router.put("/id/:_id", imageLoad, authentication, PostController.update);
router.put("/like/:_id", authentication, PostController.like);
router.put("/unlike/:_id", authentication, PostController.unlike);

router.get("/total", PostController.count);
router.get("/title/:title", PostController.getPostsBytitle);
router.delete(
    "/id/:_id",
    authentication,
    isAuthorOrAdmin,
    PostController.delete,
);

module.exports = router;
