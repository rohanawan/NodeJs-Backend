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

module.exports = {
    validateRequest,
    validateCSV
}