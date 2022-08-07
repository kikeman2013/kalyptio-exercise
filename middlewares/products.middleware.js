const productsValidator = require("../validators/products.validator");
class ProductsMiddleware {
  create = async (req, res, next) => {
    try {
      req.products = await productsValidator.insert().validateAsync({
        ...req.body,
      });
      next();
    } catch (error) {
      res.status(error.statusCode || 400).json(error);
    }
  };
  get = async (req, res, next) => {
    try {
      req.products = await productsValidator.get().validateAsync({
        ...req.params,
      });
      next();
    } catch (error) {
      res.status(error.statusCode || 400).json(error);
    }
  };
  update = async (req, res, next) => {
    try {
      req.products = await productsValidator.update().validateAsync({
        ...req.body,
      });
      next();
    } catch (error) {
      res.status(error.statusCode || 400).json(error);
    }
  };
  delete = async (req, res, next) => {
    try {
      req.products = await productsValidator.delete().validateAsync({
        ...req.params,
      });
      next();
    } catch (error) {
      res.status(error.statusCode || 400).json(error);
    }
  };
}
module.exports = new ProductsMiddleware();
