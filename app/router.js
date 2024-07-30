const express = require("express");
const router = express.Router();

const { mainController } = require("./controller/mainController");

router.get("/", mainController.homePage);
router.get("/store", mainController.storePage);

module.exports = { router };
