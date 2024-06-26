const express = require("express");
const CommentController = require("../controllers/CommentController");
const router = express.Router();
const { imageLoad } = require("../middleware/multer");
const {
    authentication,
    isCommentAuthorOrAdmin,
} = require("../middleware/authentication");

router.post(
    "/post/:postId",
    imageLoad,
    authentication,
    CommentController.create,
);
router.get("/", CommentController.getAll);
router.get("/id/:_id", CommentController.getbyid);
router.put("/like/:_id", authentication, CommentController.like);
router.put("/unlike/:_id", authentication, CommentController.unlike);
router.put(
    "/id/:_id",
    authentication,
    isCommentAuthorOrAdmin,
    CommentController.update,
);

router.delete(
    "/id/:_id",
    authentication,
    isCommentAuthorOrAdmin,
    CommentController.delete,
);

module.exports = router;
