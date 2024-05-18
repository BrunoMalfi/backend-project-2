const path = require('path');
const staticDir = path.join("./uploads");

const ImageController= {
    sowImage (req, res) {
        const imageName = req.params.imageName;
        const imagePath = path.join(staticDir, imageName);
        const mainDirPath = path.join(__dirname, '..');
        res.sendFile(mainDirPath+"/"+imagePath, (error) => {
          if (error) {
            res.status(404).send('Image not found at : ' +mainDirPath + " / "+ imagePath);
          }
        });
    }
}

module.exports = ImageController;