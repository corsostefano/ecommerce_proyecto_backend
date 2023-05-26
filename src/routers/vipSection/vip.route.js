import { Router } from 'express';
import { verifyToken } from '../../config/jwt.config.js';
import { vipSection, userProfile, uploadProducts, getProductosUser} from '../../controllers/vip.controller.js';
import { checkVIP } from '../../middleware/checkVip.middleware.js';


const router = Router();

router.get('/', verifyToken, checkVIP, vipSection);

router.get('/profile', verifyToken, checkVIP, userProfile);

router.get('/upload-products', verifyToken, checkVIP, uploadProducts)

router.get('/products',  verifyToken, checkVIP, getProductosUser)




export default router;
