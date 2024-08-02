const { client } = require("./client");

/**
 * @typedef {Object} Product
 * @property {String} name
 * @property {Number} reference
 * @property {String} origin
 * @property {Number} price_kilo
 * @property {String} main_feature
 * @property {Boolean} availability
 * @property {String} description
 */

const dataMapper = {
    /**
     * Retourne les n derniers produits ajoutés
     * @param {Number} nbOfProducts
     * @returns {Promise<Product[]>} retourne un tableau d'objets Product
     */
    getLatestProducts: async (nbOfProducts) => {
        const query = {
            text: `SELECT name, reference, main_feature FROM coffee ORDER BY publication_date DESC LIMIT $1`,
            values: [nbOfProducts],
        };
        const result = await client.query(query);
        return result.rows;
    },
    /**
     * Retourne tous les produits
     * @returns {Promise<Product[]>} retourne un tableau d'objets Product
     */
    getAllProducts: async () => {
        const query =
            "SELECT name, reference, main_feature, price_kilo FROM coffee";
        const result = await client.query(query);
        return result.rows;
    },
    /**
     * Retourne le produit correspondant à la référence
     * @param {Number} reference
     * @returns {Promise<Product>|null}
     */
    getOneProduct: async (reference) => {
        const query = {
            text: `SELECT * FROM coffee WHERE reference = $1`,
            values: [reference],
        };
        const result = await client.query(query);
        if (!result.rows?.length) {
            return null;
        }
        return result.rows[0];
    },
    /**
     * Retourne toutes les main_feature (caractéristique principale)
     * @returns {Promise<Object|null>}
     */
    getCategories: async () => {
        const query = "SELECT main_feature FROM coffee GROUP BY main_feature";
        const result = await client.query(query);
        return result.rows;
    },
    /**
     * Retourne les produit correspodant à la main_feature
     * @param {String} main_feature
     * @returns {Promise<Product|null>} retourne un tableau d'objets Product
     */
    getProductsByCategory: async (main_feature) => {
        const query = {
            text: `SELECT name, reference, main_feature FROM coffee WHERE main_feature = $1`,
            values: [main_feature],
        };
        const result = await client.query(query);
        if (!result.rows?.length) {
            return null;
        }
        return result.rows;
    },
    /**
     * Ajoute un produit à la BDD
     * @param {Product} product
     * @returns {Promise<Product|null>}
     */
    addProduct: async (product) => {
        const query = {
            text: `
                INSERT INTO coffee (name, reference, origin, price_kilo, main_feature, availability, description)
                VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
                `,
            values: [
                product.name,
                product.reference,
                product.origin,
                product.price_kilo,
                product.main_feature,
                product.availability,
                product.description,
            ],
        };
        const result = await client.query(query);
        if (!result.rows?.length) {
            return null;
        }
        return result.rows[0];
    },
    /**
     * Supprime un produit de la BDD selon sa référence
     * @param {Number} reference
     * @returns {Promise<Product|null>}
     */
    deleteProduct: async (reference) => {
        const query = {
            text: `DELETE FROM coffee WHERE reference = $1 RETURNING *`,
            values: [reference],
        };
        const result = await client.query(query);
        if (!result.rows?.length) {
            return null;
        }
        return result.rows[0];
    },
    /**
     * Retourne l'user si existe dans la BDD
     * @param {String} username
     * @returns {Promise<Object|null>}
     */
    findUser: async (username) => {
        const query = {
            text: "SELECT * FROM admin WHERE username = $1",
            values: [username],
        };
        const result = await client.query(query);
        if (!result.rows?.length) {
            return null;
        }
        return result.rows[0];
    },
};

module.exports = { dataMapper };
