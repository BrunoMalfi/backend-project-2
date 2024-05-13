const express = require("express");
const CommentController = require("../controllers/CommentController");
const router = express.Router();
const { imageLoad } = require("../middleware/multer");

router.post("/", imageLoad, CommentController.create);
//probablemente esto o podemos crear desde una ruta de post y tenga mas sentido. Por ahora por motivos pedagogicos lo dejo aquí.
router.get("/", CommentController.getAll);
router.get("/id/:_id", CommentController.getbyid);
router.get("/user/:user", CommentController.getbyuser);
router.put("/like/:_id", CommentController.like);

router.delete("/id/:_id", CommentController.delete);

module.exports = router;
