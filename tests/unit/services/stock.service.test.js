const httpStatus = require('http-status');
const { increaseStock, decreaseStock } = require('../../../src/services/stock.service');
const { Product, Stock } = require('../../../src/models');
const ApiError = require('../../../src/utils/ApiError');

jest.mock('../../../src/models');

describe('Stock Service', () => {
  describe('increaseStock', () => {
    it('should increase stock quantity and return updated product', async () => {
        const productId = 'product-id';
        const quantity = 5;
        const product = {
          _id: productId,
          quantity: 10,
          save: jest.fn().mockResolvedValue({ _id: productId, quantity: 15 }),
        };
        const stock = null;
  
        Product.findById.mockResolvedValue(product);
        Stock.findOne.mockResolvedValue(stock);
        Stock.prototype.save = jest.fn().mockResolvedValue({ productId, quantity: 5 });
  
        const result = await increaseStock(productId, quantity);
  
        expect(Product.findById).toHaveBeenCalledWith(productId);
        expect(product.quantity).toBe(15);
        expect(product.save).toHaveBeenCalled();
        expect(Stock.findOne).toHaveBeenCalledWith({ productId });
        expect(Stock.prototype.save).toHaveBeenCalledWith();
        expect(result).toEqual({ _id: productId, quantity: 15 });
    });

    it('should decrease stock quantity and return updated product', async () => {
        const productId = 'product-id';
        const quantity = 3;
        const product = {
          _id: productId,
          quantity: 5,
          save: jest.fn().mockResolvedValue({ _id: productId, quantity: 2 }),
        };
        const stock = { productId, quantity: 5 };
      
        Product.findById.mockResolvedValue(product);
        Stock.findOne.mockResolvedValue(stock);
        Stock.prototype.save = jest.fn().mockResolvedValue({ productId, quantity: 2 });
      
        const result = await decreaseStock(productId, quantity);
      
        expect(Product.findById).toHaveBeenCalledWith(productId);
        expect(product.quantity).toBe(2);
        expect(product.save).toHaveBeenCalled();
        expect(Stock.findOne).toHaveBeenCalledWith({ productId });
        expect(Stock.prototype.save).toHaveBeenCalled(); 
        expect(result).toEqual({ _id: productId, quantity: 2 });
      });
      
      it('should handle errors and throw ApiError', async () => {
        const productId = 'product-id';
        const quantity = 5;
        const product = {
          _id: productId,
          quantity: 10,
          save: jest.fn().mockRejectedValue(new Error('Database error')),
        };
        const stock = { productId, quantity: 2 };
      
        Product.findById.mockResolvedValue(product);
        Stock.findOne.mockResolvedValue(stock);
        Stock.prototype.save = jest.fn().mockResolvedValue({ productId, quantity: 7 });
      
        await expect(increaseStock(productId, quantity)).rejects.toThrow(
          new ApiError(httpStatus.BAD_REQUEST, 'Failed to increase stock quantity')
        );
        expect(Product.findById).toHaveBeenCalledWith(productId);
      });      
      
  });

  describe('decreaseStock', () => {
    it('should decrease stock quantity and return updated product', async () => {
      const productId = 'product-id';
      const quantity = 5;
      const product = {
        _id: productId,
        quantity: 10,
        save: jest.fn().mockResolvedValue({ _id: productId, quantity: 5 }),
      };
      const stock = { productId, quantity: 7 };

      Product.findById.mockResolvedValue(product);
      Stock.findOne.mockResolvedValue(stock);
      Stock.prototype.save = jest.fn().mockResolvedValue({ productId, quantity: 2 });

      const result = await decreaseStock(productId, quantity);

      expect(Product.findById).toHaveBeenCalledWith(productId);
      expect(product.quantity).toBe(5);
      expect(product.save).toHaveBeenCalled();
      expect(Stock.findOne).toHaveBeenCalledWith({ productId });
      expect(Stock.prototype.save).toHaveBeenCalledWith();
      expect(result).toEqual({ _id: productId, quantity: 5 });
    });
});  
});