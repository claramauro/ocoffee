const bcrypt = require("bcrypt");

/**
 * @param {String} password
 * @returns {String} hash du password
 */
function hashPassword(password) {
    return bcrypt.hashSync(password, 11);
}
