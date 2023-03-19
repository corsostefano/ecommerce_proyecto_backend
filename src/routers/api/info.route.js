import { Router } from 'express';
import { indexInfo } from '../../controllers/info.controller.js'

const router = Router();

router.get('/info', indexInfo)

export default router;