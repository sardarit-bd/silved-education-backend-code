import express from "express";
import { addArea, addCatagory, adminDeshboard, deleteArea, deleteCatagory, getAllAreas, getAllCatagory, updateArea, updateCatagory } from "../../controllers/adminController/adminController.js";
import { authorize, protect } from "../../middlewares/authMiddleware.js";


const router = express.Router();


router.get("/deshboard", protect, authorize("admin"), adminDeshboard);

router.post("/addcatagory", protect, authorize("admin"), addCatagory);

router.post("/addarea", protect, authorize("admin"), addArea);

router.get("/allcatagory", protect, authorize("admin"), getAllCatagory);

router.get("/allarea", protect, authorize("admin"), getAllAreas);

router.put("/updatecatagory/:id", protect, authorize("admin"), updateCatagory);

router.put("/updatearea/:id", protect, authorize("admin"), updateArea);

router.delete("/deletecatagory/:id", protect, authorize("admin"), deleteCatagory);

router.delete("/deletearea/:id", protect, authorize("admin"), deleteArea);



export default router;