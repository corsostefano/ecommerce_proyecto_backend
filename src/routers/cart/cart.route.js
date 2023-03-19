import { Router } from 'express';
import { indexCart, getAllCarts, createCart, getCart, addProductToCart, addSameProduct, deleteCart, deleteProductFromCart, buyCart, newOrder } from '../../controllers/cart.controller.js';
import { verifyToken } from '../../config/jwt.config.js';

const router = Router();

router.get('/', verifyToken, indexCart)
router.get('/carritos', verifyToken, getAllCarts)
router.post('/', verifyToken, createCart)
router.get('/:email', verifyToken, getCart)
router.post('/:id', verifyToken, addProductToCart)
router.put('/:id', verifyToken, addSameProduct)
router.delete('/:id', verifyToken, deleteCart)
router.delete('/:id/:product_id', verifyToken, deleteProductFromCart)
router.post('/:cart_id/:user_id', verifyToken, buyCart)
router.post('/order/new/:id', verifyToken, newOrder);

export default router;