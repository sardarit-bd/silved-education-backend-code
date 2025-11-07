import express from "express";
import { getAllUsers, getUser } from '../../controllers/userController/userController.js';
import { protect } from "../../middlewares/authMiddleware.js";


const router = express.Router();



router.get("/allusers", protect, getAllUsers);
router.get("/user", protect, getUser);



export default router;