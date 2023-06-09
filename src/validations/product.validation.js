const Joi = require('joi');
const { objectId } = require('./custom.validation');

const validateCreateProduct = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
  }),
};

const validateGetProducts = {
  query: Joi.object().keys({
    name: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const validateGetProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

const validateUpdateProducts = {
  params: Joi.object().keys({
    productId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      description: Joi.string(),
      price: Joi.number(),
      quantity: Joi.number(),
    })
    .min(1),
};

module.exports = {
  validateCreateProduct,
  validateGetProducts,
  validateGetProduct,
  validateUpdateProducts,
};
