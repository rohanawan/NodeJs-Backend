const path = require('path');
const catchAsync = require('../utils/catchAsync');
const { uploadService } = require('../services');

const upload = catchAsync(async (req, res) => {
  const response = await uploadService.uploadImage(req);
  res.json(response);
});

const getImage = catchAsync(async (req, res) => {
  const { filename } = req.params;
  const imagePath = path.resolve(__dirname, '..', 'uploads', filename);
  res.sendFile(imagePath);
});

const bulkUpload = catchAsync(async (req, res, next) => {
  await uploadService.bulkUpload(req, res, next);
});

module.exports = {
  upload,
  bulkUpload,
  getImage,
};
