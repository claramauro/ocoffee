const bcrypt = require("bcrypt");
const { renameSync, unlinkSync } = require("node:fs");
const path = require("node:path");
const { dataMapper } = require("../database/dataMapper.js");

const adminController = {
    loginPage: (req, res) => {
        if (req.session.isAdminConnected) {
            res.redirect("/admin");
        } else {
            res.render("./admin/login");
        }
    },
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
        if (!isPasswordValid || user.role !== "admin") {
            res.render("./admin/login", {
                error: "Nom d'utilisateur ou mot de passe incorrect",
            });
        } else {
            req.session.isAdminConnected = true;
            res.redirect("/admin");
        }
    },
    logout: (req, res) => {
        delete req.session.isAdminConnected;
        req.session.destroy();
        res.redirect("/admin/login");
    },
    index: async (req, res) => {
        const products = await dataMapper.getAllProducts();
        res.render("./admin/index", { products });
    },

    addProductPage: async (req, res) => {
        const categories = await dataMapper.getCategories();
        res.render("./admin/add-product", { categories });
    },
    addProduct: async (req, res) => {
        // Renommer l'image téléchargée
        renameSync(
            req.file.path,
            `${req.file.destination}/${Number(req.body.reference)}.png`
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
        const reference = Number(req.params.reference);
        const result = await dataMapper.deleteProduct(reference);
        if (!result) {
            next();
            return;
        }
        // Supprimer l'image
        unlinkSync(
            path.join(__dirname, `../../public/images/${reference}.png`)
        );
        res.redirect("/admin");
    },
    updateProductPage: async (req, res, next) => {
        const reference = Number(req.params.reference);
        const product = await dataMapper.getOneProduct(reference);
        if (!product) {
            next();
            return;
        }
        const categories = await dataMapper.getCategories();
        res.render("./admin/update-product.ejs", { product, categories });
    },
    updateProduct: async (req, res) => {
        const productReference = Number(req.params.reference);
        const product = req.body;
        product.availability = product.availability ? true : false;
        const result = await dataMapper.updateProduct(
            productReference,
            product
        );
        if (!result) {
            const categories = await dataMapper.getCategories();
            res.render("./admin/update-product", {
                error: "Une erreur est survenue, impossible de modifier le produit.",
                product,
                categories,
            });
            return;
        }
        if (req.file !== undefined) {
            // Supprimer l'ancienne image
            unlinkSync(
                path.join(
                    __dirname,
                    `../../public/images/${product.reference}.png`
                )
            );
            // Renommer la nouvelle image
            renameSync(
                req.file.path,
                `${req.file.destination}/${Number(product.reference)}.png`
            );
        } else if (
            req.file === undefined &&
            productReference !== Number(product.reference)
        ) {
            renameSync(
                path.join(
                    __dirname,
                    `../../public/images/${productReference}.png`
                ),
                path.join(
                    __dirname,
                    `../../public/images/${product.reference}.png`
                )
            );
        }
        res.redirect("/admin");
    },
    addCategoryPage: async (req, res) => {
        if (!req.query.main_feature) {
            res.render("./admin/add-category");
            return;
        }
        const newFeature = req.query.main_feature;
        const result = await dataMapper.addCategory(newFeature);
        if (!result) {
            res.render("./admin/add-category", {
                error: "Une erreur est survenue, impossible d'ajouter la catégorie.",
            });
            return;
        }
        res.redirect("/admin");
    },
};

module.exports = { adminController };
