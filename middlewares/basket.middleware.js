const basketValidator = require("../validators/basket.validator");
class BasketMiddleware {
  insert = async (req, res, next) => {
    try {
      req.basket = await basketValidator.insert().validateAsync({
        ...req.body,
      });
      next();
    } catch (error) {
      res.status(error.statusCode || 400).json(error);
    }
  };
  get = async (req, res, next) => {
    try {
      req.basket = await basketValidator.get().validateAsync({
        ...req.params,
      });
      next();
    } catch (error) {
      res.status(error.statusCode || 400).json(error);
    }
  };
  update = async (req, res, next) => {
    try {
      req.basket = await basketValidator.update().validateAsync({
        ...req.body,
      });
      next();
    } catch (error) {
      res.status(error.statusCode || 400).json(error);
    }
  };
  delete = async (req, res, next) => {
    try {
      req.basket = await basketValidator.delete().validateAsync({
        ...req.params,
      });
      next();
    } catch (error) {
      res.status(error.statusCode || 400).json(error);
    }
  };
}
module.exports = new BasketMiddleware();
