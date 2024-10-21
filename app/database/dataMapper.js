const { client } = require("./client");

/**
 * @typedef {Object} Product
 * @property {String} name
 * @property {Number} reference
 * @property {String} origin
 * @property {Number} price_kilo
 * @property {String} category
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
            text: `
                SELECT coffee.name AS name, coffee.reference AS reference, category.name AS category FROM coffee 
                JOIN category ON coffee.category_id = category.id
                ORDER BY coffee.created_at DESC LIMIT $1;
            `,
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
        const query = `SELECT coffee.name AS name, coffee.reference AS reference, category.name AS category, coffee.price_kilo FROM coffee JOIN category ON coffee.category_id = category.id;`;
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
            text: `
                SELECT coffee.name AS name, reference, origin, price_kilo, availability, description, coffee.created_at, category.name AS category
                FROM coffee 
                JOIN category ON coffee.category_id = category.id
                WHERE reference = $1;
            `,
            values: [reference],
        };
        const result = await client.query(query);
        if (!result.rows?.length) {
            return null;
        }
        return result.rows[0];
    },
    /**
     * Retourne toutes les categories triées par ordre alphabétique
     * @returns {Promise<Object|null>}
     */
    getCategories: async () => {
        const query = `SELECT id, name FROM category ORDER BY name`;
        const result = await client.query(query);
        return result.rows;
    },
    /**
     * Retourne toutes les catégories triées par ordre alphabétique, ainsi que le nombre de café par catégorie
     * @returns {Promise<Object|null>}
     */
    getCountProductByCategory: async () => {
        const query = `
            SELECT category.id, category.name, COUNT(coffee.id) AS total FROM category 
            LEFT JOIN coffee ON coffee.category_id = category.id 
            GROUP BY category.id, category.name 
            ORDER BY category.name;`;
        const result = await client.query(query);
        return result.rows;
    },
    /**
     * Ajoute une nouvelle category (caractéristique principale) dans la table category
     * @returns {Promise<Object|null>}
     */
    addCategory: async (category) => {
        const query = {
            text: `INSERT INTO category (name) VALUES (INITCAP($1)) RETURNING *;`, // Met la première lettre en majuscule pour uniformiser
            values: [category],
        };
        const result = await client.query(query);
        if (!result.rows?.length) {
            return null;
        }
        return result.rows[0];
    },
    deleteCategory: async (id) => {
        const query = {
            text: `DELETE FROM category WHERE id = $1 RETURNING *`,
            values: [id],
        };
        const result = await client.query(query);
        if (!result.rows?.length) {
            return null;
        }
        return result.rows[0];
    },
    /**
     * Retourne les produit correspondant à la category
     * @param {String} category
     * @returns {Promise<Product|null>} retourne un tableau d'objets Product
     */
    getProductsByCategory: async (id) => {
        const query = {
            text: `
                SELECT coffee.name AS name, coffee.reference AS reference, category.name AS category
                FROM coffee 
                JOIN category ON category.id = coffee.category_id
                WHERE category.id = $1;
            `,
            values: [id],
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
        try {
            await client.query("BEGIN");
            const query1 = {
                text: "SELECT id FROM category WHERE name = $1",
                values: [product.category],
            };
            let result = await client.query(query1);
            const category_id = result.rows[0].id;
            const query2 = {
                text: `
                INSERT INTO coffee (name, reference, origin, price_kilo, category_id, availability, description)
                VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
                `,
                values: [
                    product.name,
                    product.reference,
                    product.origin,
                    product.price_kilo,
                    category_id,
                    product.availability,
                    product.description,
                ],
            };
            result = await client.query(query2);
            await client.query("COMMIT");
            return result.rows[0];
        } catch (error) {
            await client.query("ROLLBACK");
            throw error;
        }
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
     * Met à jour un produit de la BDD selon sa référence
     * @param {Number} productReference référence produit avant modification
     * @param {Product} product
     * @returns {Promise<Product|null>}
     */
    updateProduct: async (productReference, product) => {
        try {
            await client.query("BEGIN");
            const query1 = {
                text: "SELECT id FROM category WHERE name = $1",
                values: [product.category],
            };
            let result = await client.query(query1);
            const category_id = result.rows[0].id;
            const query2 = {
                text: `
                  UPDATE coffee
                  SET name=$1, reference=$2, origin=$3, price_kilo=$4, category_id=$5, availability=$6, description=$7, updated_at=CURRENT_TIMESTAMP
                  WHERE reference=$8 RETURNING *;
                `,
                values: [
                    product.name,
                    product.reference,
                    product.origin,
                    product.price_kilo,
                    category_id,
                    product.availability,
                    product.description,
                    productReference,
                ],
            };
            result = await client.query(query2);
            await client.query("COMMIT");
            return result.rows[0];
        } catch (error) {
            await client.query("ROLLBACK");
            throw error;
        }
    },
    /**
     * Retourne l'user si existe dans la BDD
     * @param {String} username
     * @returns {Promise<Object|null>}
     */
    findUser: async (username) => {
        const query = {
            text: `SELECT * FROM "user" WHERE username = $1`,
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
