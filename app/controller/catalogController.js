const { dataMapper } = require("../database/dataMapper.js");

const catalogController = {
    showPage: async (req, res) => {
        const products = await dataMapper.getAllProducts();
        if (!req.session.showAllProduct) {
            // Page catalogue par défaut = 3 produits affichés
            products.splice(3, products.length - 3);
        }
        res.render("catalog", { products });
    },
    updateSession: (req, res) => {
        if (!req.session.showAllProduct) {
            req.session.showAllProduct = true;
        }
        res.redirect("/catalog");
    },
};

module.exports = { catalogController };
