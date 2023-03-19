import { Router } from "express";
import passport from "passport";
import {
  getCookie,
  signIn,
  signOut,
  signUp
} from "../../controllers/auth.controller.js";

const router = Router();

router.get("/cookie", getCookie)
router.post("/sign-in", passport.authenticate("sign-in", { session: false}), signIn);
router.post("/sign-out", signOut);
router.post("/sign-up", passport.authenticate("sign-up", { session: false}), signUp);

export default router;
