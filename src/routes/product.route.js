const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const {
  productValidation: { validateCreateProduct, validateGetProducts, validateGetProduct, validateUpdateProducts },
} = require('../validations');
const {
  productController: { createProduct, getProducts, getProduct, updateProduct, deleteProduct },
} = require('../controllers');

const { increaseStock, decreaseStock } = require('../controllers/stock.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageUsers'), validate(validateCreateProduct), createProduct)
  .get(auth('getUsers'), validate(validateGetProducts), getProducts);

router
  .route('/:productId')
  .get(auth('getUsers'), validate(validateGetProduct), getProduct)
  .patch(auth('manageUsers'), validate(validateUpdateProducts), updateProduct)
  .delete(auth('manageUsers'), validate(validateGetProduct), deleteProduct);

router.route('/:productId/increaseStock').patch(increaseStock);

router.route('/:productId/decreaseStock').patch(decreaseStock);

module.exports = router;
