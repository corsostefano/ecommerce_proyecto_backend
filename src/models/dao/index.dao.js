import MessageDAO from './message.dao.js';
import ProductDAO from './product.dao.js';
import UserDAO from './user.dao.js';
import CartDAO from './cart.dao.js';
import OrderDAO from './order.dao.js';

const messageInstance = MessageDAO.getInstance();
const productInstance = ProductDAO.getInstance();
const userInstance = UserDAO.getInstance();
const cartInstance = CartDAO.getInstance();
const orderInstance = OrderDAO.getInstance();

export { messageInstance, productInstance, userInstance, cartInstance, orderInstance };