import { Router } from 'express';
import { mockingProd } from '../../controllers/mocking.product.controller.js';

const router = Router();

router.get('/',  mockingProd);

export default router;

