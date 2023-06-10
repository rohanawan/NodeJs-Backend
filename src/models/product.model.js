const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { Stock } = require('./stock.model')

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  imageURL: {
    type: String,
  },
});

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);

// sync product quantity with stock quantity 
productSchema.methods.updateQuantity = async function () {
  const productId = this._id;
  const stock = await Stock.findOne({ productId });
  if (stock) {
    this.quantity = stock.quantity;
    await this.save();
  }
};

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
