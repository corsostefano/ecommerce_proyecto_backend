import { logger } from '../logs/logger.logs.js';
import { sendMail } from '../utils/email.utils.js'
import cartServices from '../services/cart.service.js';
import orderServices from '../services/order.service.js';
import { getUser } from '../services/user.services.js';

export async function indexCart(_, res, next) {
  try {
    res.status(200).render('cart.handlebars');
  } catch (err) {
    logger.error(err.message);
    const customError = new Error(err.message);
    customError.id = 3;
    next(customError);
  }
}

export async function getAllCarts(_, res, next) {
  try {
    const cart = await cartServices.getCarts();
    res.json(cart);
  } catch (err) {
    logger.error(err.message);
    const customError = new Error(err.message);
    customError.id = 3;
    next(customError);
  }
}

export async function createCart(req, res, next) {
  try {
    const userEmail = req.body;
    const isCart = await cartServices.getCartByEmail(userEmail);
    if (!isCart) {
      const newCart = await cartServices.createANewCart({
        email: userEmail.email,
        timestamp: Date.now(),
        products: []
      });
      logger.info('Se creó un nuevo carrito: ', newCart);
      res.status(200).json(newCart._id);
    } else {
      res.status(400).json({ error: 'ya hay un carrito creado' });
    }
  } catch (err) {
    logger.error(err.message);
    const customError = new Error(err.message);
    customError.id = 3;
    next(customError);
  }
}

export async function getCart(req, res, next) {
  try {
    const { params: { email } } = req;
    const cart = await cartServices.getCartByEmail(email);
    res.json(cart);
  } catch (err) {
    logger.error(err.message);
    const customError = new Error(err.message);
    customError.id = 3;
    next(customError);
  }
}

export async function addProductToCart(req, res, next) {
  try {
    let product = req.body;
    let cartId = req.params.id;
    const addProduct = await cartServices.uploadCartById(cartId, product);
    logger.info('Se añadió un nuevo producto al carrito');
    res.status(200).json(addProduct);
  } catch (err) {
    logger.error(err.message);
    const customError = new Error(err.message);
    customError.id = 3;
    next(customError);
  }
}

export async function addSameProduct(req, res, next) {
  try {
    const { id } = req.params;
    const product = req.body;
    const updateCart = await cartServices.uploadCartQuantity(id, product);
    res.status(200).json(updateCart);
  } catch (err) {
    logger.error(err.message);
    const customError = new Error(err.message);
    customError.id = 3;
    next(customError);
  }
}

export async function deleteCart(req, res, next) {
  try {
    const { id } = req.params;
    const deletedCart = await cartServices.deleteCartById(id)
    res.status(200).json(deletedCart);
  } catch (err) {
    logger.error(err.message);
    const customError = new Error(err.message);
    customError.id = 3;
    next(customError);
  }
}

export async function deleteProductFromCart(req, res, next) {
  try {
    const { id, product_id } = req.params;
    const deletedItemCart = await cartServices.deleteItemById(id, product_id);
    logger.info('Se eliminió un producto');
    res.status(200).json(deletedItemCart);
  } catch (err) {
    logger.error(err.message);
    const customError = new Error(err.message);
    customError.id = 3;
    next(customError);
  }
}

export async function buyCart(req, res, next) {
  try {
    const { cart_id, user_id } = req.params;
    const productsCart = req.body;
    const user = await getUser(user_id);
    const timestamp = new Date();
    const message = `Gracias por su compra ${user.email}! Su orden de compra es: '${cart_id}' generada en la fecha y hora ${timestamp.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })} ${timestamp.getHours()}:${timestamp.getMinutes()}:${timestamp.getSeconds()}. Su pedido es:
    <p>${productsCart.message}</p>
    <p>estado: generada</p>`;
    await sendMail(`Usuario ${user.email} realizó una compra`, message, process.env.USER_GMAIL);
    await sendMail('Gracias por su compra', message, user.email);
    logger.info('La compra ya ha sido comunicada al proveedor');
    res.status(200).json(message);
  } catch (err) {
    logger.error(err.message);
    const customError = new Error(err.message);
    customError.id = 3;
    next(customError);
  }
}

export async function newOrder(req, res, next) {
  try {
    const { id } = req.params;
    const orderBody = req.body;
    const newOrder = {...orderBody, id}
    await orderServices.addNewOrder(newOrder);
    res.status(200).json(`Orden de compra ${id} almacenada!`)
  } catch (err) {
    logger.error(err.message);
    const customError = new Error(err.message);
    customError.id = 3;
    next(customError);
  }
}