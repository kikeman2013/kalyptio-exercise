const products = require("../services/products.service");
class ProductsController {
  create = async (req, res) => {
    try {
      const data = req.products;
      const result = await products.insertProducts(data);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.statusCode || 400).json(error);
    }
  };
  get = async (req, res) => {
    try {
      const data = req.products;
      const result = await products.getProduct(data);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.statusCode || 400).json(error);
    }
  };
  getAll = async (req, res) => {
    try {
      const result = await products.getAllProducts();

      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.statusCode || 400).json(error);
    }
  };
  update = async (req, res) => {
    try {
      const data = req.products;
      const result = await products.updateProducts(data);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.statusCode || 400).json(error);
    }
  };
  delete = async (req, res) => {
    try {
      const data = req.products;
      const result = await products.deleteProducts(data);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.statusCode || 400).json(error);
    }
  };
}
module.exports = new ProductsController();
