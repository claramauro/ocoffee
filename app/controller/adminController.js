const bcrypt = require("bcrypt");
const Joi = require("joi");
const sanitizeHtml = require("sanitize-html");
const { renameSync, unlinkSync } = require("node:fs");
const path = require("node:path");
const { dataMapper } = require("../database/dataMapper.js");
const { sanitizeObject } = require("../../utils/sanitizeHtml.js");

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
    addProduct: async (req, res, next) => {
        const product = req.body;
        const schema = Joi.object({
            name: Joi.string().trim().required(),
            reference: Joi.string()
                .trim()
                .pattern(/^\d{9}$/)
                .required(),
            origin: Joi.string().trim(),
            price_kilo: Joi.string()
                .trim()
                .pattern(/^\d+([.,]\d+)?$/)
                .required(),
            category: Joi.string().trim().required(),
            availability: Joi.optional(),
            description: Joi.string().trim().required(),
        });
        const { error } = schema.validate(product);
        const existingProduct = await dataMapper.getOneProduct(product.reference);
        if (error || existingProduct) {
            let message;
            if (existingProduct) {
                message = `Un produit avec la référence ${product.reference} existe déjà, veuillez modifier la référence.`;
            } else {
                message = error.message;
            }
            unlinkSync(req.imagePath);
            const categories = await dataMapper.getCategories();
            // On fourni product pour préremplir le formulaire avec les données déjà soumises
            return res.render("./admin/add-product", {
                product: sanitizeObject(product),
                error: message,
                categories,
            });
        }
        product.availability = product.availability ? true : false;
        try {
            const addedProduct = await dataMapper.addProduct(sanitizeObject(product));
            // Renommer l'image téléchargée
            // req.imagePath : propriété ajouté à req dans middleware saveImage.js
            const newNameFile = `${Number(addedProduct.reference)}.webp`;
            renameSync(req.imagePath, `${path.dirname(req.imagePath)}/${newNameFile}`);
            res.redirect("/admin");
        } catch (error) {
            // Supprimer l'image téléchargée
            unlinkSync(req.imagePath);
            next(error);
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
        unlinkSync(path.join(__dirname, `../../public/images/products/${reference}.webp`));
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
        const productToUpdate = req.body;
        const schema = Joi.object({
            name: Joi.string().trim().required(),
            reference: Joi.string()
                .trim()
                .pattern(/^\d{9}$/)
                .required(),
            origin: Joi.string().trim(),
            price_kilo: Joi.string()
                .trim()
                .pattern(/^\d+([.,]\d+)?$/)
                .required(),
            category: Joi.string().trim().required(),
            availability: Joi.optional(),
            description: Joi.string().trim().required(),
        });
        const { error } = schema.validate(productToUpdate);
        if (error) {
            if (req.file !== undefined) {
                unlinkSync(req.imagePath);
            }
            const categories = await dataMapper.getCategories();
            // On fourni product pour préremplir le formulaire avec les données déjà soumises
            return res.render("./admin/update-product", {
                product: sanitizeObject(productToUpdate),
                error: error.message,
                categories,
            });
        }
        productToUpdate.availability = productToUpdate.availability ? true : false;
        const updatedProduct = await dataMapper.updateProduct(productReference, sanitizeObject(productToUpdate));
        if (req.file !== undefined) {
            // Supprimer l'ancienne image
            unlinkSync(path.join(__dirname, `../../public/images/products/${productReference}.webp`));

            // Renommer la nouvelle image
            const newNameFile = `${Number(updatedProduct.reference)}.webp`;
            renameSync(req.imagePath, `${path.dirname(req.imagePath)}/${newNameFile}`);
        } else if (req.file === undefined && productReference !== Number(updatedProduct.reference)) {
            renameSync(
                path.join(__dirname, `../../public/images/products/${productReference}.webp`),
                path.join(__dirname, `../../public/images/products/${updatedProduct.reference}.webp`)
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
        // Supprimer les cafés associés et son image
        res.redirect("/admin/categories");
    },
    addCategoryPage: async (req, res) => {
        res.render("./admin/add-category");
    },
    addCategory: async (req, res) => {
        let category = req.body.category;
        const schema = Joi.string().trim().required();
        const { error } = schema.validate(category);
        if (error) {
            return res.render("./admin/add-category", { error: error.message });
        }
        category = sanitizeHtml(category, { allowedTags: [], allowedAttributes: [] });
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
