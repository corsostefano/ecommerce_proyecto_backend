import { faker } from '@faker-js/faker';

export default class mockingProducts {
    constructor() {}
        generateProduct(amount){
            let products = []
            for (let i = 0; i < amount; i++){
                products.push({
                    title: faker.commerce.productName(),
                    price: faker.commerce.price(1, 5000),
                    thumbnail: faker.image.imageUrl()
                })
            }
            return products
        }
}