import { logger } from '../logs/logger.logs.js';
import productServices from '../services/product.service.js';

export async function indexProducts(_, res, next) {
  try {
    const productos = await productServices.getAll();
    res.status(200).render('products.handlebars', { productos });
  } catch (err) {
    logger.error(err.message);
    const customError = new Error(err.message);
    customError.id = 3;
    next(customError);
  }
}

export async function getAllProducts(_, res, next) {
  try {
    const productos = await productServices.getAll();
    res.status(200).json(productos);
  } catch (err) {
    logger.error(err.message);
    const customError = new Error(err.message);
    customError.id = 3;
    next(customError);
  }
}

export async function getByCategory(req, res, next) {
  try {
    const { category } = req.params;
    const products = await productServices.getAll();
    const filteredProducts = products.filter(prod => prod.category === category);
    if (!filteredProducts.length) {
      logger.warn('No existe la categoría solicitada de juegos de mesa');
      const customError = new Error('No existe la categoría solicitada de juegos de mesa');
      customError.id = 3;
      next(customError);      
    } else {
      res.json({ filteredProducts });
    }
  } catch (err) {
    logger.error(err.message);
    const customError = new Error(err.message);
    customError.id = 3;
    next(customError);
  }
}

export async function getImageProduct(req, res, next) {
  try {
    const { params: { id } } = req;
    const product = await productServices.getProductById(id);
    const ruta = product.thumbnail;
    const nombreArchivo = ruta.replace("./img/", "");
    res.send(`<img src="../../img/${nombreArchivo}" alt="imagen${product.title}">`)
  } catch (err) {
    logger.error(err.message);
    const customError = new Error(err.message);
    customError.id = 3;
    next(customError);
  }
}

export async function addNewProduct(req, res, next) {
  try {
    const data = req.body;
    const response = await productServices.addProduct(data);
    res.status(201).json(response);
  } catch (err) {
    logger.error(err.message);
    const customError = new Error(err.message);
    customError.id = 3;
    next(customError);
  }
}

export async function getProduct(req, res, next) {
  try {
    const { params: { id } } = req;
    const product = await productServices.getProductById(id);
    if (!product) {
      return res.status(404).end()
    }
    res.status(200).json(product);
  } catch (err) {
    logger.error(err.message);
    const customError = new Error(err.message);
    customError.id = 3;
    next(customError);
  }
}

export async function updateProduct(req, res, next) {
  try {
    let id = req.params.id;
    let data = req.body;
    const product = await productServices.updateProductById(id, data);
    res.status(201).json(product);
  } catch (err) {
    logger.error(err.message);
    const customError = new Error(err.message);
    customError.id = 3;
    next(customError);
  }
}

export async function deleteProduct(req, res, next) {
  try {
    const { id } = req.params;
    const response = await productServices.deleteProductById(id);
    res.status(200).json(response);
  } catch (err) {
    logger.error(err.message);
    const customError = new Error(err.message);
    customError.id = 3;
    next(customError);
  }
}