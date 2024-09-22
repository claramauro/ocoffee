const storeRouter = require("express").Router();
const { storeController } = require("../controller/storeController.js");

storeRouter.get("/store", storeController.index);

module.exports = { storeRouter };
