import { Router } from 'express';
import { logger } from '../../logs/logger.logs.js';

const router = Router()

router.get("*", (req, res, next) => {
    try {
        logger.warn(`Acceso a ruta inexistente ${req.originalUrl} con el método ${req.method}`);
        res.redirect("/");
    } catch (err) {
        logger.error(`${err.message}`);
        const customError = new Error(err.message);
        customError.id = 1;
        next(customError);
    }
});

export default router