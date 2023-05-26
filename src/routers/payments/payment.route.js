import { Router } from 'express';
import {  paymentIntent } from '../../controllers/payment.controller.js'
import { verifyToken } from '../../config/jwt.config.js';

const router = Router();

router.post('/payment-intents',verifyToken,  paymentIntent);

export default router;

