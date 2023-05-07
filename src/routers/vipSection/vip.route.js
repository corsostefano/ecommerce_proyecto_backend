import { Router } from 'express';
import { verifyToken } from '../../config/jwt.config.js';
import { vipSection, userProfile, uploadProducts} from '../../controllers/vip.controller.js';
import { checkVIP } from '../../middleware/checkVip.middleware.js';


const router = Router();

router.get('/', verifyToken, checkVIP, vipSection);

router.get('/profile', verifyToken, checkVIP, userProfile);

router.get('/upload-products', verifyToken, checkVIP, uploadProducts)




export default router;
