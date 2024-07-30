const path = require("node:path");
const { dataMapper } = require("../database/dataMapper.js");

const mainController = {
    homePage: async (req, res, next) => {
        try {
            const latestProducts = await dataMapper.getLatestProducts(3);
            res.render("index", { products: latestProducts });
        } catch (error) {
            next(error);
        }
    },
    storePage: (req, res) => {
        res.render("store");
    },
};

module.exports = { mainController };
