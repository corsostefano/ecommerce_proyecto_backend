    import { logger } from '../logs/logger.logs.js';
    import {paymentIntentServices} from '../services/payment.services.js'
    

    export async function paymentIntent(req, res, next) {
        try {
            const { id } = req.query;
            const response = await paymentIntentServices(id)
            res.send({ status: "success", payload: response})
  
        } catch (err) {
        logger.error(err.message);
        const customError = new Error(err.message);
        customError.id = 3;
        next(customError);
        }
    }