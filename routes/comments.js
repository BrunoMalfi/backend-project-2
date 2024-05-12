const express = require("express");
const CommentController = require("../controllers/CommentController");
const router = express.Router();

router.post("/:post_id", CommentController.create);
//probablemente esto o podemos crear desde una ruta de post y tenga mas sentido. Por ahora por motivos pedagogicos lo dejo aquí.
router.get("/", CommentController.getAll);
router.delete("/id/:_id", CommentController.delete);

module.exports = router;
