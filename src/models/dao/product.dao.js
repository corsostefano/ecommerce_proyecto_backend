import MongoDBContainer from './containers/mongoDB.container.js';
import productModel from '../schema/product.model.js';

let productInstance = null;

export default class ProductDAO extends MongoDBContainer {
    constructor(model) {
        super(model);
    }

    static getInstance() {
        if (!productInstance) {
            productInstance = new ProductDAO(productModel);
        }
        return productInstance
    }
}