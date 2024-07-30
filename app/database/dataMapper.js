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
};

module.exports = { dataMapper };
