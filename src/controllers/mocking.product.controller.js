import { logger } from '../logs/logger.logs.js';
import mockingProducts from '../services/mocking.product.services.js';

const mockingProduct = new mockingProducts ()

export async function mockingProd(req, res, next){
    try {
        const productos = await mockingProduct.generateProduct(100);
        res.status(200).render('mocking.product.handlebars', { productos });
        logger.info('Products generated successfully');
      } catch (err) {
          logger.error(err.message);
          const customError = new Error(err.message);
          customError.id = 3;
          next(customError);
      }
}