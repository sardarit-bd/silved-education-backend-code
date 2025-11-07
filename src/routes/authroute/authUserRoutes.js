import express from "express";
import { loginUser, logoutUser, registerUser } from "../../controllers/authcontroller/authuserController.js";
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const router = express.Router();



router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);


export default router;
  