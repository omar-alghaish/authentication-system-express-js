const morgan = require("morgan");
const express = require("express");
const app = express();
const dotenv = require("dotenv");

exports.morganMiddleWare = () => {
    if ((process.env.NODE_ENV = "development")) {
        app.use(morgan("dev"));
        console.log(`mode: ${process.env.NODE_ENV}`);
    }
};

exports.env = () => {
    dotenv.config({
        path: "config.env",
    });
};
