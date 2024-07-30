const path = require("node:path");

const mainController = {
    homePage: (req, res) => {
        res.sendFile("index.html", {
            root: path.join(__dirname, "../../integration"),
        });
    },
    storePage: (req, res) => {
        res.sendFile("store.html", {
            root: path.join(__dirname, "../../integration"),
        });
    },
};

module.exports = { mainController };
