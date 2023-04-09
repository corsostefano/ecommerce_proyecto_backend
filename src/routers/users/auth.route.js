import { Router } from "express";
import passport from "passport";
import {
  getCookie,
  signIn,
  signOut,
  signUp,
  forgotPassword,
  resetPassword,
  renderResetPassword
} from "../../controllers/auth.controller.js";

const router = Router();

router.get("/cookie", getCookie)
router.post("/sign-in", passport.authenticate("sign-in", { session: false}), signIn);
router.post("/sign-out", signOut);
router.post("/sign-up", passport.authenticate("sign-up", { session: false}), signUp);
router.post("/forgot-password", forgotPassword);
router.post('/reset-password', resetPassword)
router.get('/forgot-password/resetPassword',renderResetPassword);



export default router;
