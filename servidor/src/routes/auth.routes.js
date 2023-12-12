import { Router } from "express";

import { login, register, logout, getProfile } from "../controllers/auth.controllers.js";

import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", [authRequired], getProfile);

export default router;
