const express = require("express");
const app = express();
const router = express.Router();

//basket	Controller
const basket = require("../controllers/basket.controller");

//basket	Middleware
const basketMiddleware = require("../middlewares/basket.middleware");

//routes to basket
router.post("/create", [basketMiddleware.insert], basket.create);
router.put("/insert", [basketMiddleware.update], basket.update);
router.get("/total/:basketId", [basketMiddleware.get], basket.getTotal);
router.get("/:basketId", [basketMiddleware.get], basket.get);
router.delete("/delete/:basketId", [basketMiddleware.delete], basket.delete);
//verify to exist a basquetId
router.get("/exist/:basketId", [basketMiddleware.get], basket.getExist);

app.use("/api/basket", router);
module.exports = app;
