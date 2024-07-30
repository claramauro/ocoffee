const express = require("express");
const router = express.Router();

const { catchError } = require("./middlewares/errorHandlers");
const { homeController } = require("./controller/homeController");
const { catalogController } = require("./controller/catalogController");
const { storeController } = require("./controller/storeController");

router.get("/", catchError(homeController.showPage));
router.get("/catalog", catchError(catalogController.showPage));

router.get("/store", storeController.showPage);

module.exports = { router };
