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
            req.app.locals.isAdminConnected = true;
            res.redirect("/admin");
        }
    },
    logout: (req, res) => {
        delete req.session.isAdminConnected;
        delete req.app.locals.isAdminConnected;
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
        renameSync(req.file.path, `${req.file.destination}/${Number(req.body.reference)}.png`);
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
        unlinkSync(path.join(__dirname, `../../public/images/${reference}.png`));
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
        res.render("./admin/update-product", { product, categories });
    },
    updateProduct: async (req, res) => {
        const productReference = Number(req.params.reference);
        const product = req.body;
        product.availability = product.availability ? true : false;
        const result = await dataMapper.updateProduct(productReference, product);
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
            unlinkSync(path.join(__dirname, `../../public/images/${product.reference}.png`));
            // Renommer la nouvelle image
            renameSync(req.file.path, `${req.file.destination}/${Number(product.reference)}.png`);
        } else if (req.file === undefined && productReference !== Number(product.reference)) {
            renameSync(
                path.join(__dirname, `../../public/images/${productReference}.png`),
                path.join(__dirname, `../../public/images/${product.reference}.png`)
            );
        }
        res.redirect("/admin");
    },

    categoryPage: async (req, res) => {
        const categories = await dataMapper.getCountProductByCategory();
        res.render("./admin/categories", { categories });
    },

    deleteCategory: async (req, res) => {
        const id = req.params.id;
        const result = await dataMapper.deleteCategory(id);
        if (!result) {
            next();
            return;
        }
        res.redirect("/admin/categories");
    },
    addCategoryPage: async (req, res) => {
        res.render("./admin/add-category");
    },
    addCategory: async (req, res) => {
        const category = req.body.category;
        const result = await dataMapper.addCategory(category);
        if (!result) {
            res.render("./admin/add-category", {
                error: "Une erreur est survenue, impossible d'ajouter la catégorie.",
            });
        } else {
            res.redirect("/admin/categories");
        }
    },
};

module.exports = { adminController };
