import { logger } from '../logs/logger.logs.js';
import productServices from '../services/product.service.js';
import cloudinary from '../config/cloudinary.config.js';


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
      logger.warn('No existe la categoría solicitada');
      const customError = new Error('No existe la categoría solicitada ');
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
    const { title, price } = req.body;
    const thumbnail = req.file;

    if (!thumbnail) {
      throw new Error('No se cargó ninguna imagen.');
    }

    const result = await cloudinary.uploader.upload(thumbnail.path);
    const thumbnailUrl = result.secure_url;
    const newProduct = {
      title,
      price,
      thumbnail: thumbnailUrl
    };

    await productServices.addProduct(newProduct);
    res.redirect('/productos');
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
    const id = req.params.id;
    const data = req.body;
    const product = await productServices.updateProductById(id, data);
    res.status(200).json(product);
  } catch (err) {
    logger.error(err.message);
    const customError = new Error(err.message);
    customError.statusCode = 400;
    next(customError);
  }
}

export async function deleteProduct(req, res, next) {
  try {
    const id = req.params.id;
    const response = await productServices.deleteProductById(id);
    res.status(204).end(response);
  } catch (err) {
    logger.error(err.message);
    const customError = new Error(err.message);
    customError.statusCode = 400;
    next(customError);
  }
}


export async function search(req, res, next) {
  try {
    const query = req.query.query;
    const productos = await productServices.searchProductByQuery(query);
    if (productos.length === 0) { 
      const error = {
        message: 'Lo sentimos, el producto no ha sido encontrado.'
      };
      res.status(404).render('error.handlebars', { error });
    } else { 
      const productosRender = productos.map((producto) => {
        return {
          title: producto.title,
          price: producto.price,
          thumbnail: producto.thumbnail,
          _id: producto._id
        };
      });
      res.status(200).render('search.handlebars', { productos: productosRender });
    }
  } catch (err) {
    logger.error(err.message);
    const customError = new Error(err.message);
    customError.id = 3;
    next(customError);
  }
}

