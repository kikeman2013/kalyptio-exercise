const Joi = require("@hapi/joi");
class ProductsValidator {
  insert = () => {
    return Joi.object()
      .keys({
        code: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        stock: Joi.number().required(),
        img: Joi.string().required(),
      })
      .options({ allowUnknown: true, stripUnknown: true });
  };

  get = () => {
    return Joi.object()
      .keys({
        itemId: Joi.string().optional(),
      })
      .options({ allowUnknown: true, stripUnknown: true });
  };

  update = () => {
    return Joi.object()
      .keys({
        itemId: Joi.string().required(),
        code: Joi.string().optional().allow(""),
        name: Joi.string().optional().allow(""),
        description: Joi.string().optional().allow(""),
        price: Joi.number().optional().allow(""),
        stock: Joi.number().optional().allow(""),
        img: Joi.string().optional().allow(""),
      })
      .options({ allowUnknown: true, stripUnknown: true });
  };

  delete = () => {
    return Joi.object()
      .keys({
        ItemId: Joi.string().required(),
      })
      .options({ allowUnknown: true, stripUnknown: true });
  };
}
module.exports = new ProductsValidator();
