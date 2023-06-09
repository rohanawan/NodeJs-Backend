const { getProductById, updateProductById, deleteProductById } = require('../../../src/services/product.service');
const { Product } = require('../../../src/models');
const ApiError = require('../../../src/utils/ApiError');

jest.mock('../../../src/models');

describe('Product Service', () => {
  describe('getProductById', () => {
    it('should return the product if found', async () => {
      const productId = '1';
      const product = { _id: productId, name: 'Test Product' };
      Product.findById.mockResolvedValue(product);

      const result = await getProductById(productId);

      expect(result).toEqual(product);
    });

    it('should throw an error if product not found', async () => {
      const productId = 'fakeId';
      Product.findById.mockRejectedValue(new ApiError('Product not found'));

      await expect(getProductById(productId)).rejects.toThrow(ApiError);
    });
  });

  describe('updateProductById', () => {
    it('should update a product by id', async () => {
      const productId = '1';
      const updateData = { name: 'Updated Product' };

      const product = { _id: productId, name: 'Test Product' };
      product.save = jest.fn().mockResolvedValue(product);

      Product.findById.mockResolvedValue(product);

      const result = await updateProductById(productId, updateData);

      expect(result).toEqual(product);
      expect(product.save).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if product not found', async () => {
      const productId = '1';
      const updateData = { name: 'Updated Product' };
      Product.findById.mockResolvedValue(null);
      await expect(updateProductById(productId, updateData)).rejects.toThrow(ApiError);
    });
  });

  describe('deleteProductById', () => {
    it('should delete a product by id', async () => {
      const productId = '1';
      const product = { _id: productId, name: 'Test Product' };
      product.remove = jest.fn().mockResolvedValue(product);

      Product.findById.mockResolvedValue(product);

      const result = await deleteProductById(productId);

      expect(result).toEqual(product);
      expect(product.remove).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if product not found', async () => {
      const productId = '1';
      Product.findById.mockResolvedValue(null);

      await expect(deleteProductById(productId)).rejects.toThrow(ApiError);
    });
  });
});
