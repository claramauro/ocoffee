const sanitizeHtml = require("sanitize-html");

/**
 * Sanitize les valeurs de type string de l'object
 * @param {Object} object
 * @returns {Object} l'objet sanitizé
 */
function sanitizeObject(object) {
    for (let property in object) {
        if (typeof object[property] === "string") {
            object[property] = sanitizeHtml(object[property], { allowedTags: [], allowedAttributes: [] });
        }
    }
    return object;
}

module.exports = { sanitizeObject };
