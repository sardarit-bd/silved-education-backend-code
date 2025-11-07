import express from "express";
import { createProduct, deleteProduct, getAllProduct, getSingleProduct, updateProduct } from '../../controllers/productController/productController.js';
import generateSSLO from "../../controllers/sslo.controller.js";
import { protect } from "../../middlewares/authMiddleware.js";
import upload from "../../middlewares/upload.js";


const router = express.Router();

router.get("/allproducts", getAllProduct);

router.get("/singleProduct/:id", getSingleProduct);

router.post("/createProduct", upload.fields([
    { name: "license", maxCount: 1 },
    { name: "insurance", maxCount: 1 },
    { name: "serviceImages", maxCount: 4 },
]), createProduct);

router.put("/updateProduct/:id", protect, updateProduct);

router.delete("/deleteProduct/:id", protect, deleteProduct);


router.post("/api/sslo/generate", generateSSLO);


export default router;