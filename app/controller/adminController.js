const bcrypt = require("bcrypt");
const { renameSync } = require("node:fs");
const { dataMapper } = require("../database/dataMapper.js");

const adminController = {
    login: async (req, res) => {
        const { username, password } = req.body;
        const user = await dataMapper.findUser(username, password);
        if (!user) {
            res.render("./admin/login", {
                error: "Nom d'utilisateur ou mot de passe incorrect",
            });
            return;
        }
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            res.render("./admin/login", {
                error: "Nom d'utilisateur ou mot de passe incorrect",
            });
        } else {
            req.session.isAdminConnected = true;
            res.redirect("/admin");
        }
    },
    logout: (req, res) => {
        if (req.session.isAdminConnected) {
            delete req.session.isAdminConnected;
        }
        res.redirect("/admin/login");
    },
    loginPage: (req, res) => {
        if (req.session.isAdminConnected) {
            res.redirect("/admin");
        } else {
            res.render("./admin/login");
        }
    },
    showAdminPage: async (req, res) => {
        const products = await dataMapper.getAllProducts();
        if (req.session.isAdminConnected) {
            res.render("./admin/admin", { products });
        } else {
            res.render("./admin/login");
        }
    },

    addProductPage: async (req, res) => {
        if (!req.session.isAdminConnected) {
            res.redirect("/admin/login");
        } else {
            const categories = await dataMapper.getCategories();
            res.render("./admin/add-product", { categories });
        }
    },
    addProduct: async (req, res) => {
        renameSync(
            req.file.path,
            `${req.file.destination}/${req.body.reference}.png`
        );
        const product = req.body;
        product.availability = product.availability ? true : false;
        const result = await dataMapper.addProduct(product);
        if (!result) {
            res.render("./admin/add-product", {
                error: "Une erreur est survenue, impossible d'ajouter le produit.",
            });
        } else {
            res.redirect("/admin");
        }
    },
    deleteProduct: async (req, res, next) => {
        if (!req.session.isAdminConnected) {
            res.redirect("/admin/login");
            return;
        }
        const reference = Number(req.params.reference);
        const result = await dataMapper.deleteProduct(reference);
        if (!result) {
            next();
            return;
        }
        res.redirect("/admin");
    },
};

module.exports = { adminController };
