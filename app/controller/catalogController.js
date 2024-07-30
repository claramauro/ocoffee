const { dataMapper } = require("../database/dataMapper.js");

const catalogController = {
    showPage: async (req, res) => {
        const products = await dataMapper.getAllProducts();
        res.render("catalog", { products });
    },
};

module.exports = { catalogController };
