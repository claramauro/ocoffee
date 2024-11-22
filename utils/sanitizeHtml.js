const sanitizeHtml = require("sanitize-html");

/**
 * Sanitize all string values in the object
 * @param {Object} object
 * @returns {Object} sanitized object
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
