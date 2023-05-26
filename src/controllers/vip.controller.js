import { logger } from "../logs/logger.logs.js";
import { getUser } from "../services/user.services.js";
import productServices from '../services/product.service.js';

export async function vipSection(req, res, next) {
  try {
    res.render('vipSection.handlebars');
  } catch (err) {
    logger.error(err.message);
    const customError = new Error(err.message);
    customError.id = 3;
    next(customError);
  }
}
export async function userProfile(req, res, next) {
  try {
    const user = await getUser(req.user.id);

    const userData = {
      fullname: user.fullname,
      email: user.email,
      phone: user.phone
    };

    res.render('vipProfile.handlebars', { userData });
  } catch (err) {
    logger.error(err.message);
    const customError = new Error(err.message);
    customError.id = 3;
    next(customError);
  }
}

export async function uploadProducts(req, res, next) {
  try {
    res.render('uploadProducts.handlebars');
  } catch (err) {
    logger.error(err.message);
    const customError = new Error(err.message);
    customError.id = 3;
    next(customError);
  }
}

export async function getProductosUser(req, res, next) {
  try {
    const userId = req.user._id; 
    const productos = await productServices.getProductsByUser(userId);
    res.status(200).render('productsByUsers.handlebars', { productos });
  } catch (err) {
    logger.error(err.message);
    const customError = new Error(err.message);
    customError.id = 3;
    next(customError);
  }
}


