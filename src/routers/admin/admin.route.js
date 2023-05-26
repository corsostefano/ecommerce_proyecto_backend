import { Router } from "express";
import { verifyAdminToken } from "../../config/jwt.config.js";
//import passport from "passport";
import { isAdmin } from "../../middleware/checkAdmin.middleware.js";
import {
    adminPanel,
    getAllAdminUsers,
    productListing
} from "../../controllers/admin.controller.js";
import { initAdminPassport } from "../../config/admin.passport.js";

const router = Router();

initAdminPassport(),

//Panel Administrador
router.get('/', verifyAdminToken, isAdmin, adminPanel)
//Panel Usuarios
//Mostrar todos los usuarios 
router.get('/users', verifyAdminToken, isAdmin, getAllAdminUsers);
//Mostrar listado de productos
router.get('/products-listing',verifyAdminToken, isAdmin, productListing)

router.get("/favicon.ico", (_, res) => res.status(204).end());

export default router