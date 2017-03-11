"use strict";

const path = require("path");

module.exports = {
    entry: path.join(__dirname, "build", "index.js"),
    output: {
        filename: "app.js"
    },
    devtool: "source-map"
};
