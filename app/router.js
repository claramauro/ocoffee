const express = require("express");
const router = express.Router();

const { catchError } = require("./middlewares/errorHandlers");
const { homeController } = require("./controller/homeController");
const { catalogController } = require("./controller/catalogController");
const { productController } = require("./controller/productController");
const { storeController } = require("./controller/storeController");

router.get("/", catchError(homeController.showPage));

router.get("/catalog", catchError(catalogController.showPage));
router.get("/catalog/all", catchError(catalogController.updateSession));

router.get("/product/:reference(\\d+)", catchError(productController.showPage));

router.get("/store", storeController.showPage);

module.exports = { router };
