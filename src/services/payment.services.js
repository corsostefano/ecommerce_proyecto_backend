import { stripePayment } from "../utils/stripePayment.js";
import productServices from "./product.service.js"


export async function paymentIntentServices(id){
    const selectedProduct = await productServices.getProductById(id)
    const paymentInfo = {
        amount: selectedProduct.price * 100, 
        currency: "usd",
    };
    const result = await stripePayment.createPaymentIntent(paymentInfo)

    console.log(result)
}

