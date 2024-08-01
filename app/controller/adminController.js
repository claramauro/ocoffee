const bcrypt = require("bcrypt");
const { renameSync } = require("node:fs");
const { dataMapper } = require("../database/dataMapper.js");

const adminController = {
    formPage: (req, res) => {
        if (req.session.isAdminConnected) {
            res.redirect("/admin/product/add");
        } else {
            res.render("admin-login");
        }
    },
    login: async (req, res) => {
        const { username, password } = req.body;
        const user = await dataMapper.findUser(username, password);
        if (!user) {
            res.render("admin-login", {
                error: "Nom d'utilisateur ou mot de passe incorrect",
            });
            return;
        }
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            res.render("admin-login", {
                error: "Nom d'utilisateur ou mot de passe incorrect",
            });
        } else {
            req.session.isAdminConnected = true;
            req.app.locals.isAdminConnected = true;
            res.redirect("/admin/product/add");
        }
    },
    addProductFormPage: (req, res) => {
        if (!req.session.isAdminConnected) {
            res.redirect("/admin/login");
        } else {
            res.render("add-product");
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
            res.render("add-product", {
                error: "Une erreur est survenue, impossible d'ajouter le produit.",
            });
        } else {
            res.redirect("/catalog/all");
        }
    },
};

module.exports = { adminController };
