"use strict";

const path = require("path");

module.exports = {
    entry: path.join(__dirname, "build", "index.js"),
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "build"),
    },
    devtool: "source-map"
};
