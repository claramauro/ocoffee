const { dataMapper } = require("../database/dataMapper.js");

const homeController = {
    index: async (req, res) => {
        const latestProducts = await dataMapper.getLatestProducts(3);
        res.render("index", { products: latestProducts });
    },
};

module.exports = { homeController };
