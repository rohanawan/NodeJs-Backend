const httpStatus = require('http-status');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const csv = require('csv-parser');
const { Product } = require('../models');
const { productService } = require('.');
const ApiError = require('../utils/ApiError');

const validateRequest = (req) => {
  const { file } = req;
  if (!file) {
    throw new ApiError(httpStatus.BAD_REQUEST, '"File" is required fields');
  }
};

const validateCSV = (row) => {
  if (!row.name || !row.description || !row.price || !row.quantity || !row.imageURL) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid CSV format. Something Missing');
  }
};

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
        const product = {
          name: row.name,
          description: row.description,
          price: Number(row.price),
          quantity: Number(row.quantity),
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
