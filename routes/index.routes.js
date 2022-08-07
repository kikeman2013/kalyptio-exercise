const express = require("express");
const app = express();

app.use(require("./products.routes"), require("./basket.routes"));

module.exports = app;
