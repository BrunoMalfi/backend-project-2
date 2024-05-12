const express = require("express");
const CommentController = require("../controllers/CommentController");
const router = express.Router();

router.post("/:post_id", CommentController.create);
router.get("/", CommentController.getAll);

module.exports = router;
