import express from "express";
import { getAllProduct } from '../../controllers/productController/productController.js';
import generateSSLO from "../../controllers/sslo.controller.js";


const router = express.Router();

router.get("/allproducts", getAllProduct);

router.post("/api/sslo/generate", generateSSLO);


export default router;