import { Router } from "express";
import { verifyToken, verifyAdminToken } from '../../config/jwt.config.js'
import { isAdmin } from "../../middleware/checkAdmin.middleware.js";
import {
  getAuthUser,
  registerUser,
  getAllUsers,
  getOneUser,
  updateUser,
  deleteOneUser,
  deleteInactiveUsers
} from "../../controllers/user.controller.js";


const router = Router();

router.get("/me", verifyToken, getAuthUser);
router.post("/", registerUser);
router.get("/", verifyToken, getAllUsers);
router.get("/:id", verifyToken, getOneUser);
router.put("/:id", verifyToken, updateUser);
router.delete('/:id',verifyAdminToken, isAdmin, deleteOneUser);
router.delete('/inactive/delete',verifyAdminToken, isAdmin, deleteInactiveUsers);

export default router;
