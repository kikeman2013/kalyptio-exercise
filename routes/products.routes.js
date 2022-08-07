const express = require("express");
const app = express();
const router = express.Router();

//products	Controller
const products = require("../controllers/products.controller");

//products	Middleware
const productsMiddleware = require("../middlewares/products.middleware");

//routes to products
router.post("/create", [productsMiddleware.create], products.create);
router.put("/update", [productsMiddleware.update], products.update);
router.get("/", products.getAll);
router.get("/:itemId", [productsMiddleware.get], products.get);
router.delete("/delete/:ItemId", [productsMiddleware.delete], products.delete);
app.use("/api/products", router);
module.exports = app;
