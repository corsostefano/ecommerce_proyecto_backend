import { logger } from '../logs/logger.logs.js';
import mockingProducts from '../services/mocking.product.services.js';

const mockingProduct = new mockingProducts ()

export async function mockingProd(req, res, next){
    try {
        const products = await mockingProduct.generateProduct(100);
        res.json(products);
        logger.info('Products generated successfully');
      } catch (err) {
          logger.error(err.message);
          const customError = new Error(err.message);
          customError.id = 3;
          next(customError);
      }
}