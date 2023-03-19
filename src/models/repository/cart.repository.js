import { cartInstance } from "../dao/index.dao.js";
import CartDTO from "../dto/cart.dto.js";

export default class CartRepository {
    constructor() {
        this.dao = cartInstance;
    }

    async getAllShopCarts() {
        const data = await this.dao.getAll();
        if (data) {
            const dataDTO = data.map((cart) => new CartDTO(cart));
            return dataDTO;
        } else {
            return null;
        }
    }

    async createNew(data) {
        const response = await this.dao.create(data);
        return new CartDTO(response);
    }

    async getACartByEmail(email) {
        const data = await this.dao.getOneByEmail(email);
        if (data) {
            return new CartDTO(data);
        } else {
            return null;
        }
    }

    async updateCart(idCart, prod) {
        return await this.dao.updateCartById(idCart, prod);
    }

    async updateQuantityProduct(id, prod) {
        return await this.dao.updateQuantityOfAProduct(id, prod);
    }

    async deleteACart(id) {
        return await this.dao.deleteById(id);
    }

    async deleteProduct(id, product_id) {
        return await this.dao.deleteProductByIdFromCart(id, product_id);
    }
}