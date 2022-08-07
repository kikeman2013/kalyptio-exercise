const Joi = require("@hapi/joi");
class BasquetValidator {
  insert = () => {
    return Joi.object()
      .keys({
        cart: Joi.object()
          .keys({
            items: Joi.array()
              .items(
                Joi.object().keys({
                  code: Joi.string().required(),
                  count: Joi.number().required(),
                })
              )
              .optional(),
          })
          .optional(),
      })
      .options({ allowUnknown: true, stripUnknown: true });
  };

  get = () => {
    return Joi.object()
      .keys({
        basketId: Joi.string().required(),
      })
      .options({ allowUnknown: true, stripUnknown: true });
  };

  update = () => {
    return Joi.object()
      .keys({
        basketId: Joi.string().required(),
        cart: Joi.object()
          .keys({
            items: Joi.array()
              .items(
                Joi.object().keys({
                  code: Joi.string().required(),
                  count: Joi.number().required(),
                })
              )
              .required(),
          })
          .required(),
      })
      .options({ allowUnknown: true, stripUnknown: true });
  };

  delete = () => {
    return Joi.object()
      .keys({
        basketId: Joi.string().required(),
      })
      .options({ allowUnknown: true, stripUnknown: true });
  };
}
module.exports = new BasquetValidator();
