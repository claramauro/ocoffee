const adminRouter = require("express").Router();
const { adminController } = require("../controller/adminController.js");
const { catchError } = require("../middlewares/errorHandlers.js");

const path = require("node:path");
const multer = require("multer");
const { isAuth } = require("../middlewares/isAuth.js");
const upload = multer({ dest: path.join(__dirname, "../../public/images") });

adminRouter.get("/admin/login", adminController.loginPage);
adminRouter.post("/admin/login", catchError(adminController.login));

adminRouter.use(isAuth);

adminRouter.get("/admin/logout", adminController.logout);

adminRouter.get("/admin", catchError(adminController.index));

adminRouter.get("/admin/product/add", adminController.addProductPage);
adminRouter.post(
    "/admin/product/add",
    upload.single("image"),
    catchError(adminController.addProduct)
);

adminRouter.get(
    "/admin/product/delete/:reference(\\d+)",
    catchError(adminController.deleteProduct)
);

adminRouter.get(
    "/admin/product/update/:reference(\\d+)",
    catchError(adminController.updateProductPage)
);

adminRouter.post(
    "/admin/product/update/:reference(\\d+)",
    upload.single("image"),
    catchError(adminController.updateProduct)
);
adminRouter.get(
    "/admin/category/add",
    catchError(adminController.addCategoryPage)
);

module.exports = { adminRouter };
