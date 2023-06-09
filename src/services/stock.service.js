const httpStatus = require('http-status');
const { Product, Stock } = require('../models');
const ApiError = require('../utils/ApiError');

const increaseStock = async (productId, quantity) => {
  try {
    const product = await Product.findById(productId);
    product.quantity += quantity;
    const updatedProduct = await product.save();

    // Update the stock quantity in the Stock collection
    let stock = await Stock.findOne({ productId });

    if (stock) {
      stock.quantity += quantity;
    } else {
      stock = new Stock({ productId, quantity });
    }

    await stock.save();
    return updatedProduct;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to increase stock quantity');
  }
};

const decreaseStock = async (productId, quantity) => {
  try {
    const product = await Product.findById(productId);
    if (product.quantity < quantity) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Insufficient stock');
    }

    product.quantity -= quantity;

    // Save the updated product
    const updatedProduct = await product.save();

    // Update the stock quantity in the Stock collection
    let stock = await Stock.findOne({ productId });

    if (stock) {
      stock.quantity -= quantity;
      stock = new Stock(stock); // Create a new Stock object
      await stock.save(); // Save the updated stock
    }
    return updatedProduct;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, `${error}`);
  }
};

module.exports = {
  increaseStock,
  decreaseStock,
};
