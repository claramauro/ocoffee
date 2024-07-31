// dotenv config
require("dotenv").config();

// config express
const express = require("express");
const app = express();

// imports
const path = require("node:path");
const session = require("express-session");
const { router } = require("./app/router");
const {
    notFound,
    errorHandler,
} = require("./app/middlewares/errorHandlers.js");

// Config dossier public
const securePathToAssets = path.join(__dirname, "public");
app.use(express.static(securePathToAssets));

// Config EJS
const securePathToViews = path.join(__dirname, "./app/views");
app.set("view engine", "ejs");
app.set("views", securePathToViews);

//Config session
app.use(
    session({
        secret: process.env.SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: {
            secure: false,
            maxAge: 1000 * 60 * 60 * 24, //24H en MS
            httpOnly: true,
        },
    })
);

app.use(router);

app.use(notFound);

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on ${process.env.BASE_URL}:${port}`);
});
