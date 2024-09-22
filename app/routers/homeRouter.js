const homeRouter = require("express").Router();
const { homeController } = require("../controller/homeController.js");
const { catchError } = require("../middlewares/errorHandlers.js");

homeRouter.get("/", catchError(homeController.index));

module.exports = { homeRouter };
