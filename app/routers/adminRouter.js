const adminRouter = require("express").Router();
const { adminController } = require("../controller/adminController.js");

const { catchError } = require("../middlewares/errorHandlers.js");
const { isAuth } = require("../middlewares/isAuth.js");
const { saveImage } = require("../middlewares/treatImage.js");

adminRouter.get("/login", adminController.loginPage);
adminRouter.post("/login", catchError(adminController.login));

adminRouter.use(isAuth);

adminRouter.get("/logout", adminController.logout);

adminRouter.get("", catchError(adminController.index));

adminRouter.get("/product/add", adminController.addProductPage);
adminRouter.post("/product/add", saveImage, catchError(adminController.addProduct));

adminRouter.get("/product/delete/:reference(\\d+)", catchError(adminController.deleteProduct));

adminRouter.get("/product/update/:reference(\\d+)", catchError(adminController.updateProductPage));

adminRouter.post("/product/update/:reference(\\d+)", saveImage, catchError(adminController.updateProduct));

adminRouter.get("/categories", catchError(adminController.categoryPage));

adminRouter.get("/categories/delete/:id(\\d+)", catchError(adminController.deleteCategory));

adminRouter.get("/categories/add", catchError(adminController.addCategoryPage));

adminRouter.post("/categories/add", catchError(adminController.addCategory));

module.exports = { adminRouter };
