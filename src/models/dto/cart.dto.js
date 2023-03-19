export default class CartDTO {
    constructor(products) {
        this.email = products.email,
        this._id = products._id,
        this.products = products.products
    }
}