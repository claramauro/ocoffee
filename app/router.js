const express = require("express");
const router = express.Router();
const path = require("node:path");
const multer = require("multer");
const upload = multer({ dest: path.join(__dirname, "../public/images") });

const { catchError } = require("./middlewares/errorHandlers");
const { homeController } = require("./controller/homeController");
const { catalogController } = require("./controller/catalogController");
const { productController } = require("./controller/productController");
const { storeController } = require("./controller/storeController");
const { adminController } = require("./controller/adminController");

router.get("/", catchError(homeController.showPage));

router.get("/catalog", catchError(catalogController.showPage));
router.get("/catalog/all", catalogController.updateSession);
router.get("/catalog/category", catchError(catalogController.showByCategory));

router.get("/product/:reference(\\d+)", catchError(productController.showPage));

router.get("/store", storeController.showPage);

router.get("/admin/login", adminController.formPage);
router.post("/admin/login", catchError(adminController.login));
router.get("/admin/product/add", adminController.addProductFormPage);
router.post(
    "/admin/product/add",
    upload.single("image"),
    catchError(adminController.addProduct)
);

module.exports = { router };
