import MongoDBContainer from './containers/mongoDB.container.js';
import cartModel from '../schema/cart.model.js';
import { logger } from '../../logs/logger.logs.js';

let cartInstance = null;

export default class CartDAO extends MongoDBContainer {
    constructor(model) {
        super(model);
        this.model = model;
    }

    async getOneByEmail(email) {
        try {
            const emailStr = email.toString();
            return await this.model.findOne({email: emailStr});
        } catch (err) {
            logger.error('No es posible obtener el carrito por email en la base de datos ', err);
            const customError = new Error(`No es posible obtener el carrito por email en la base de datos: ${err}`);
            customError.id = 4;
            next(customError);
        }
    }

    async updateCartById(idCart, prod) {
        try {
            return this.model.findOneAndUpdate({ _id: idCart }, { $push: { products: prod } });
        } catch (err) {
            logger.error('No es posible actualizar el carrito en la base de datos ', err);
            const customError = new Error(`No es posible actualizar el carrito en la base de datos: ${err}`);
            customError.id = 4;
            next(customError);
        }
    }

    async updateQuantityOfAProduct(id, prod) {
        try {
            return this.model.findOneAndUpdate({ _id: id, "products._id": prod._id }, { $inc: { "products.$.quantity": 1 } });
        } catch (err) {
            logger.error('No es posible actualizar el producto del carrito ', err);
            const customError = new Error(`No es posible actualizar el producto del carrito: ${err}`);
            customError.id = 4;
            next(customError);
        }
    }

    async deleteProductByIdFromCart(id, product_id) {
        try {
            return await this.model.updateOne({ _id: id }, { $pull: { products: { _id: product_id } } });
        } catch (err) {
            logger.error('No es posible eliminar el producto del carrito ', err);
            const customError = new Error(`No es posible eliminar el producto del carrito: ${err}`);
            customError.id = 4;
            next(customError);
        }
    }

    static getInstance() {
        if (!cartInstance) {
            cartInstance = new CartDAO(cartModel);
        }
        return cartInstance
    }
}