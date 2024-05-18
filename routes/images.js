const express = require("express");
const router = express.Router();
const path = require('path');
const staticDir = path.join("./uploads");
const ImageController = require("../controllers/ImageController.js");

router.get('/:imageName', ImageController.sowImage);
  module.exports = router;