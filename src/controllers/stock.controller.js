const catchAsync = require('../utils/catchAsync');
const { stockService } = require('../services');

const increaseStock = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  const product = await stockService.increaseStock(productId, quantity);
  res.json(product);
});

const decreaseStock = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  const product = await stockService.decreaseStock(productId, quantity);
  res.json(product);
});

module.exports = {
  increaseStock,
  decreaseStock,
};
