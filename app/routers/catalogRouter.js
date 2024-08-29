const catalogRouter = require("express").Router();
const { catalogController } = require("../controller/catalogController.js");
const { catchError } = require("../middlewares/errorHandlers.js");

catalogRouter.get("/catalog", catchError(catalogController.index));
catalogRouter.get("/catalog/all", catalogController.showAll);
catalogRouter.get(
    "/catalog/category",
    catchError(catalogController.showByCategory)
);

module.exports = { catalogRouter };
