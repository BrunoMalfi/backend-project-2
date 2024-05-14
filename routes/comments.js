const express = require("express");
const CommentController = require("../controllers/CommentController");
const router = express.Router();
const { imageLoad } = require("../middleware/multer");
const {
    authentication,
    isCommentAuthor,
} = require("../middleware/authentication");

router.post(
    "/post/:postId",
    imageLoad,
    authentication,
    CommentController.create,
);
router.get("/", CommentController.getAll);
router.get("/id/:_id", CommentController.getbyid);
router.get("/user/:user", CommentController.getbyuser);
router.put("/like/:_id", authentication, CommentController.like);
router.put("/id/:_id", authentication, isCommentAuthor, CommentController.like);

router.delete("/id/:_id", CommentController.delete);

module.exports = router;
