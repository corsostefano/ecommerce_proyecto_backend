import { Router } from "express";
import { verifyToken } from '../../config/jwt.config.js'
import {
  getAuthUser,
  registerUser,
  getAllUsers,
  getOneUser,
  updateUser,
  deleteOneUser,
} from "../../controllers/user.controller.js";

const router = Router();

router.get("/me", verifyToken, getAuthUser);
router.post("/", registerUser);
router.get("/", verifyToken, getAllUsers);
router.get("/:id", verifyToken, getOneUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteOneUser);

export default router;
