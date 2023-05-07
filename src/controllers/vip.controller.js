import { logger } from "../logs/logger.logs.js";

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
    res.render('vipProfile.handlebars');
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

