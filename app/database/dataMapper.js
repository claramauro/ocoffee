const { client } = require("./client");

const dataMapper = {
    /**
     * Retourne les 3 derniers produits ajoutés
     * @returns {Promise<Array>}
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
     * @returns {Promise<Array>}
     */
    getAllProducts: async () => {
        const query = "SELECT name, reference, main_feature FROM coffee";
        const result = await client.query(query);
        return result.rows;
    },
    getOneProduct: async (reference) => {
        const query = {
            text: `SELECT * FROM coffee WHERE reference = $1`,
            values: [reference],
        };
        const result = await client.query(query);
        if (!result.rows.length) {
            return null;
        }
        return result.rows[0];
    },
};

module.exports = { dataMapper };
