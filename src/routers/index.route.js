import { Router } from 'express';
import home from './home/home.route.js';
import users from './users/users.route.js';
import auth from './users/auth.route.js';
import products from './products/products.route.js';
import cart from './cart/cart.route.js';
import chat from './chat/chat.route.js';
import info from './api/info.route.js';
import noAccess from './no-access/no_access.route.js';
import mockingProducts from './products/mocking.product.router.js'


const router = Router();

router.use('/', home);
router.use('/users', users);
router.use('/auth', auth);
router.use('/productos', products);
router.use('/mockingproducts', mockingProducts); //Modulo de test 
router.use('/carrito', cart);
router.use('/chat', chat);
router.use('/api', info)
router.use('/', noAccess);



export default router;