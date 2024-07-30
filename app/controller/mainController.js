const path = require("node:path");
const { dataMapper } = require("../database/dataMapper.js");

const mainController = {
    homePage: async (req, res, next) => {
        try {
            const latestProducts = await dataMapper.getLatestProducts(3);
            res.render("index", {
                title: "oCoffee - boutique de café haut de gamme",
                page: "index",
                products: latestProducts,
            });
        } catch (error) {
            next(error);
        }
    },
    storePage: (req, res) => {
        res.sendFile("store.html", {
            root: path.join(__dirname, "../../integration"),
        });
    },
};

module.exports = { mainController };
