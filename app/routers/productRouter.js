const productRouter = require("express").Router();
const { productController } = require("../controller/productController.js");
const { catchError } = require("../middlewares/errorHandlers.js");

productRouter.get(
    "/product/:reference(\\d+)",
    catchError(productController.show)
);

module.exports = { productRouter };
