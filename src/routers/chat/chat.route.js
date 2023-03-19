import { Router } from 'express';
import { indexChat, getChatsByEmail } from '../../controllers/chat.controllers.js';
import { verifyToken } from '../../config/jwt.config.js'

const router = Router();

router.get('/', verifyToken, indexChat)
router.get('/:email', verifyToken, getChatsByEmail)

export default router;