const path = require("node:path");
const multer = require("multer");
const upload = multer({ dest: path.join(__dirname, "../../public/images/products") });

function saveImage(req, res, next) {
    upload.single("image")(req, res, (err) => {
        if (err) {
            return next(err); // Passer l'erreur au middleware d'erreur
        }
        next();
    });
}

module.exports = { saveImage };
