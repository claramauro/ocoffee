const express = require("express");
const router = express.Router();

const { homeRouter } = require("./homeRouter.js");
const { catalogRouter } = require("./catalogRouter.js");
const { productRouter } = require("./productRouter.js");
const { storeRouter } = require("./storeRouter.js");
const { adminRouter } = require("./adminRouter.js");

router.use(homeRouter);

router.use(catalogRouter);

router.use(productRouter);

router.use(storeRouter);

/**Partie Admin */
router.use("/admin", adminRouter);

module.exports = { router };
