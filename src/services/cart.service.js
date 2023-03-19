import CartRepository from "../models/repository/cart.repository.js";

const repository = new CartRepository();

async function getCarts() {
    return await repository.getAllShopCarts();
}

async function createANewCart(data) {
    return await repository.createNew(data);
}

async function getCartByEmail(email) {
    return await repository.getACartByEmail(email);
}

async function uploadCartById(idCart, prod) {
    return await repository.updateCart(idCart, prod);
}

async function uploadCartQuantity(id, prod) {
    return await repository.updateQuantityProduct(id, prod);
}

async function deleteCartById(id) {
    return await repository.deleteACart(id);
}

async function deleteItemById(id, product_id) {
    return await repository.deleteProduct(id, product_id);
}

export default {
    getCarts,
    createANewCart,
    getCartByEmail,
    uploadCartById,
    uploadCartQuantity,
    deleteCartById,
    deleteItemById,
};