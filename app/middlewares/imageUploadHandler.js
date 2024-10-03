const { UserError } = require("./errorHandlers.js");

const path = require("node:path");
const sharp = require("sharp");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Liste des types MIME autorisés
        const allowedTypes = /jpeg|jpg|png|webp/;
        const mimeType = allowedTypes.test(file.mimetype);
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

        if (mimeType && extname) {
            return cb(null, true); // Fichier accepté
        } else {
            return cb(
                new UserError(
                    "Type de fichier non autorisé, veuillez télécharger une image au format JPEG, PNG ou WebP."
                ),
                false
            ); // Fichier rejeté
        }
    },
});

function convertAndSaveImage(req, res, next) {
    upload.single("image")(req, res, async (err) => {
        if (err) {
            return next(err); // Passer l'erreur au middleware d'erreur
        }
        if (req.file) {
            try {
                const originalFileName = path.parse(req.file.originalname).name;
                const imagePath = path.join(__dirname, `../../public/images/products/${originalFileName}.webp`);
                await sharp(req.file.buffer).webp().toFile(imagePath);
                req.imagePath = imagePath;
            } catch (error) {
                next(error);
            }
        }
        next();
    });
}

module.exports = { convertAndSaveImage };
