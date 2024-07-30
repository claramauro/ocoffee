const { dataMapper } = require("../database/dataMapper.js");

const productController = {
    showPage: async (req, res, next) => {
        const reference = Number(req.params.reference);
        const product = await dataMapper.getOneProduct(reference);
        if (!product) {
            next();
            return;
        }
        const publishDate = new Date(product.publication_date);
        product.date = {
            year: publishDate.getFullYear(),
            month: publishDate.getMonth() + 1,
            day: publishDate.getDate(),
        };
        res.render("product", { product });
    },
};

module.exports = { productController };
