import express from "express";


const router = express.Router();

/********* Import Here Controller Files **********/
import { health } from '../../controllers/healthContorller/healthController.js';



router.get("/health", health);





export default router;
