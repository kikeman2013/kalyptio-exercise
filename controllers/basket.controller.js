const basket = require("../services/basket.service");
class BasketController {
  create = async (req, res) => {
    try {
      const data = req.basket;
      const result = await basket.insertBasket(data);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.statusCode || 400).json(error);
    }
  };
  get = async (req, res) => {
    try {
      const data = req.basket;
      const result = await basket.get(data);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.statusCode || 400).json(error);
    }
  };
  update = async (req, res) => {
    try {
      const data = req.basket;
      const result = await basket.updateBasket(data);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.statusCode || 400).json(error);
    }
  };
  delete = async (req, res) => {
    try {
      const data = req.basket;
      const result = await basket.deleteBasket(data);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.statusCode || 400).json(error);
    }
  };
  getTotal = async (req, res) => {
    try {
      const data = req.basket;
      const result = await basket.getTotal(data);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.statusCode || 400).json(error);
    }
  };
  getExist = async (req, res) => {
    try {
      const data = req.basket;
      const result = await basket.getExist(data);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.statusCode || 400).json(error);
    }
  };
}
module.exports = new BasketController();
