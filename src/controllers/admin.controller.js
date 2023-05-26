import { logger } from '../logs/logger.logs.js'
import { getUsers } from '../services/user.services.js'
import productServices from '../services/product.service.js';



export async function adminPanel(_, res, next){
  try {
      res.render('adminPanel.handlebars')
  } catch (err) {
      logger.error(err.message);
      const customError = new Error (err.message);
      customError.id = 3;
      next (customError)
  }
}


//panel usuarios
export async function getAllAdminUsers(_, res, next){
    try {
        const users = await getUsers();
        const plainUsers = users.map(user => user.toObject());
        res.render('adminUsers.handlebars', { users: plainUsers });
    } catch (err) {
        logger.error(err.message);
        const customError = new Error(err.message);
        customError.id = 3;
        next(customError);
    }
}

export async function productListing(_, res, next){
    try {
        const productos = await productServices.getAll();
        res.status(200).render('adminProductListing.handlebars', {productos})
    } catch (err) {
        logger.error(err.message);
        const customError = new Error (err.message);
        customError.id = 3;
        next (customError)
    }
}
