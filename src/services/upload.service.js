const httpStatus = require('http-status');
const csv = require('csv-parser');
const fs = require('fs');
const ApiError = require('../utils/ApiError');
const { v4: uuidv4 } = require('uuid');
const { Product } = require('../models');
const { productService } = require('../services');
const {validateCSV , validateRequest} = require('../utils/validation');


const uploadImage = async (req) => {
  const uuid = uuidv4();

  // Validate file for each request
  validateRequest(req);
  const {
    file: { filename, path },
    body,
  } = req;
  const { id } = body;
  const product = await productService.getProductById(id);

  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  const destinationPath = `/Users/rohan/Desktop/Neuron-Task/src/uploads/${uuid}-${filename}`;
  fs.renameSync(path, destinationPath);

  // Update the product's imageURL property with the new filename
  product.imageURL = `${uuid}-${filename}`;
  await product.save();

  return product;
};

const bulkUpload = (req, res, next) => {
  const products = [];
  // reading csv
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (row) => {
      try {
        // Validate headers
        validateCSV(row);
        // Adding products into array
        const { name, description, price, quantity } = row;
        const product = {
            name,
            description,
            price: Number(price),
            quantity: Number(quantity),
        };
        products.push(product);
      } catch (error) {
        next(new ApiError(httpStatus.BAD_REQUEST, 'Invalid CSV format.'));
        // Return to prevent further processing
      }
    })
    .on('end', async () => {
      try {
        await Product.insertMany(products);
        res.json({ message: 'Bulk upload completed' });
      } catch (error) {
        next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to insert documents.'));
      }
    });
};

module.exports = {
  uploadImage,
  bulkUpload,
};
