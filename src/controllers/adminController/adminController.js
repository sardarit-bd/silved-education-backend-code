import Area from "../../models/Area.js";
import Category from "../../models/Category.js";
import Services from "../../models/Product.js";
import Review from "../../models/Review.js";
import User from "../../models/User.js";
import AreaSchama from "../../validationSchema/AreaSchama.js";
import CetagorySchama from "../../validationSchema/CetagorySchama.js";






/************** get all admin deshboard data *****************/
const adminDeshboard = async (req, res) => {

    try {

        //find  users and service category area and review
        const users = await User.find();
        const services = await Services.find()
        const area = await Area.find();
        const category = await Category.find();
        const review = await Review.find();




        //make the total value
        const totalUsers = users.length;
        const totalServices = services.length;
        const totalArea = area.length;
        const totalCategory = category.length;
        const totalReview = review.length;
        const totalPendingServices = services.filter((service) => service.status === "pending").length;
        const totalApprovedServices = services.filter((service) => service.status === "published").length;
        const totalRejectedServices = services.filter((service) => service.status === "rejected").length;





        res.status(200).json({
            success: true,
            message: "Admin deshboard data fetched successfully!",
            data: {
                totalUsers,
                totalServices,
                totalArea,
                totalCategory,
                totalReview,
                totalPendingServices,
                totalApprovedServices,
                totalRejectedServices
            }
        });
    } catch (error) {
        console.error("Error fetching admin deshboard data:", error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong while fetching admin deshboard data.",
        });
    }
}








/********** get all category controller is here **********/
const getAllCatagory = async (req, res) => {


    try {


        // find the total category
        const total = await Category.find();


        // Return response
        res.status(200).json({
            success: true,
            message: "Category fetched successfully!",
            total,
        });

    } catch (error) {
        console.error("Error fetching Category:", error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong while fetching Category.",
        });
    }


};




/********** get all area controller is here **********/
const getAllAreas = async (req, res) => {


    try {


        // find the total category
        const total = await Area.find();


        // Return response
        res.status(200).json({
            success: true,
            message: "Areas fetched successfully!",
            total,
        });

    } catch (error) {
        console.error("Error fetching Areas:", error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong while fetching Areas.",
        });
    }


};





/********** add catafogy  controller is here **********/
const addCatagory = async (req, res) => {

    try {


        // Validate body data using Joi schema
        const { error, value } = CetagorySchama.validate(req.body, { abortEarly: false });



        // If validation fails, return 400 with all validation errors
        if (error) {
            const validationErrors = error.details.map((err) => err.message);
            return res.status(400).json({
                success: false,
                message: "Invalid Category data.",
                errors: validationErrors,
            });
        }



        // Create Category in database
        const category = await Category.create(value);



        // Send success response
        res.status(201).json({
            success: true,
            message: "Category created successfully!",
            data: category,
        });

    } catch (err) {
        console.error("Error creating Category:", err.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong while creating the Category.",
        });
    }

};






/********** add Area  controller is here **********/
const addArea = async (req, res) => {

    try {


        // Validate body data using Joi schema
        const { error, value } = AreaSchama.validate(req.body, { abortEarly: false });



        // If validation fails, return 400 with all validation errors
        if (error) {
            const validationErrors = error.details.map((err) => err.message);
            return res.status(400).json({
                success: false,
                message: "Invalid Area data.",
                errors: validationErrors,
            });
        }



        // Create Category in database
        const area = await Area.create(value);



        // Send success response
        res.status(201).json({
            success: true,
            message: "Area created successfully!",
            data: area,
        });

    } catch (err) {
        console.error("Error creating Area:", err.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong while creating the Area.",
        });
    }

};










/********** Update  category controller is here **********/
const updateCatagory = async (req, res) => {


    try {

        const { id } = req.params;

        // Validate product ID format
        if (!id || id.length !== 24) {
            return res.status(400).json({
                success: false,
                message: "Invalid Category ID format.",
            });
        }



        const value = req.body;



        // Update the product
        const updatedCategory = await Category.findByIdAndUpdate(id, value, {
            new: true, // return updated document
            runValidators: true, // enforce schema validation
        });



        //If not found
        if (!updatedCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found.",
            });
        }


        //Success response
        res.status(200).json({
            success: true,
            message: "Category updated successfully!",
            data: updatedCategory,
        });


    } catch (err) {
        console.error("Error updating Category:", err.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong while updating the Catogory.",
        });
    }


};








/********** Update  Area controller is here **********/
const updateArea = async (req, res) => {


    try {

        const { id } = req.params;

        // Validate product ID format
        if (!id || id.length !== 24) {
            return res.status(400).json({
                success: false,
                message: "Invalid Area ID format.",
            });
        }



        const value = req.body;



        // Update the product
        const updatedArea = await Area.findByIdAndUpdate(id, value, {
            new: true, // return updated document
            runValidators: true, // enforce schema validation
        });



        //If not found
        if (!updatedArea) {
            return res.status(404).json({
                success: false,
                message: "Area not found.",
            });
        }


        //Success response
        res.status(200).json({
            success: true,
            message: "Area updated successfully!",
            data: updatedArea,
        });


    } catch (err) {
        console.error("Error updating Area:", err.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong while updating the Area.",
        });
    }


};






/********** Delete  category controller is here **********/
const deleteCatagory = async (req, res) => {


    try {


        const { id } = req.params;

        // Validate product ID format
        if (!id || id.length !== 24) {
            return res.status(400).json({
                success: false,
                message: "Invalid Category ID format.",
            });
        }



        // Attempt to delete the product
        const deletedCategory = await Category.findByIdAndDelete(id);



        //If no product found
        if (!deletedCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found.",
            });
        }



        //Success response
        res.status(200).json({
            success: true,
            message: "Category deleted successfully!",
            data: deletedCategory,
        });


    } catch (err) {
        console.error("Error deleting Category:", err.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong while deleting the Category.",
        });
    }


};





/********** Delete  area controller is here **********/
const deleteArea = async (req, res) => {


    try {


        const { id } = req.params;

        // Validate product ID format
        if (!id || id.length !== 24) {
            return res.status(400).json({
                success: false,
                message: "Invalid Area ID format.",
            });
        }



        // Attempt to delete the product
        const deletedArea = await Area.findByIdAndDelete(id);



        //If no product found
        if (!deletedArea) {
            return res.status(404).json({
                success: false,
                message: "Area not found.",
            });
        }



        //Success response
        res.status(200).json({
            success: true,
            message: "Area deleted successfully!",
            data: deletedArea,
        });


    } catch (err) {
        console.error("Error deleting Area:", err.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong while deleting the Area.",
        });
    }


};








/*********** modules export from here ************/
export { addArea, addCatagory, adminDeshboard, deleteArea, deleteCatagory, getAllAreas, getAllCatagory, updateArea, updateCatagory };

