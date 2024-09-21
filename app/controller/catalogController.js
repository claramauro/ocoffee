const { dataMapper } = require("../database/dataMapper.js");

const catalogController = {
    index: async (req, res) => {
        const categories = await dataMapper.getCategories();
        const products = await dataMapper.getAllProducts();
        if (!req.session.showAllProduct) {
            // Page catalogue par défaut = 3 produits affichés
            products.splice(3, products.length - 3);
        } else {
            res.locals.showAll = true;
        }
        res.render("catalog", { products, categories });
    },
    showAll: (req, res) => {
        if (!req.session.showAllProduct) {
            req.session.showAllProduct = true;
        }
        res.redirect("/catalog");
    },
    showByCategory: async (req, res, next) => {
        const id = req.query.id;
        if (id === "all") {
            res.redirect("/catalog/all");
            return;
        }
        const products = await dataMapper.getProductsByCategory(id);
        if (!products) {
            next();
            return;
        }
        const categories = await dataMapper.getCategories();
        res.render("catalog", {
            products,
            currentCategoryId: parseInt(id),
            categories,
        });
    },
};

module.exports = { catalogController };
