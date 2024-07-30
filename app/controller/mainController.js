const path = require("node:path");

const mainController = {
    homePage: (req, res) => {
        res.render("index", {
            title: "oCoffee - boutique de café haut de gamme",
        });
    },
    storePage: (req, res) => {
        res.sendFile("store.html", {
            root: path.join(__dirname, "../../integration"),
        });
    },
};

module.exports = { mainController };
