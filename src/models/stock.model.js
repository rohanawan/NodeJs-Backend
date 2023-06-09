const mongoose = require('mongoose');

const stockSchema = mongoose.Schema({
  productId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Product',
  },
  quantity: {
    type: Number,
    default: 0,
  },
});

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;
