const express = require("express");
const router = express.Router();

const { catchError } = require("./middlewares/errorHandlers");
const { mainController } = require("./controller/mainController");

router.get("/", catchError(mainController.homePage));
router.get("/store", mainController.storePage);

module.exports = { router };
