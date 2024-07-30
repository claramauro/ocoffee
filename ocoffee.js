// dotenv config
require("dotenv").config();

// config express
const express = require("express");
const app = express();

// imports
const path = require("node:path");
const { router } = require("./app/router");

// Config dossier public
const securePathToAssets = path.join(__dirname, "public");
app.use(express.static(securePathToAssets));

// Config EJS
const securePathToViews = path.join(__dirname, "./app/views");
app.set("view engine", "ejs");
app.set("views", securePathToViews);

app.use(router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on ${process.env.BASE_URL}:${port}`);
});
