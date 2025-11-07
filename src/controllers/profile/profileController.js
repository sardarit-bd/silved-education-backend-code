import ProfileSchama from "../../validationSchema/profileSchema.js";









/********** get all product controller is here **********/
const getAllUserProfileInfo = async (req, res) => {


    try {

        // Extract optional query parameters for filtering/pagination
        const { category, status, search, page = 1, limit = 10 } = req.query;


        // Build dynamic filter object
        const filter = {};

        if (category) filter.category = category;
        if (status) filter.status = status;
        if (search) filter.name = { $regex: search, $options: "i" }; // case-insensitive search



        // Convert pagination values to numbers
        const skip = (Number(page) - 1) * Number(limit);


        //Fetch products with filtering and pagination
        const products = await Product.find(filter)
            .skip(skip)
            .limit(Number(limit))
            .sort({ createdAt: -1 }); // newest first



        // Count total documents for pagination metadata
        const total = await Product.countDocuments(filter);




        // Return response
        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / Number(limit)),
            data: products,
        });

    } catch (error) {
        console.error("Error fetching products:", error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong while fetching products.",
        });
    }


};










/********** get single product controller is here **********/
const getSingleUserProfileInfo = async (req, res) => {

    try {
        const { id } = req.params;

        // Validate ID format
        if (!id || id.length !== 24) {
            return res.status(400).json({ error: "Invalid product ID format." });
        }


        // Find product by ID
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ error: "Product not found." });
        }


        // Return the product
        res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        console.error("Error fetching product:", error.message);
        res.status(500).json({
            success: false,
            error: "Something went wrong while fetching the product!",
        });
    }

};












/********** create product controller is here **********/
const createProfileInfo = async (req, res) => {

    try {


        // Validate body data using Joi schema
        const { error, value } = ProfileSchama.validate(req.body, { abortEarly: false });


        // If validation fails, return 400 with all validation errors
        if (error) {
            const validationErrors = error.details.map((err) => err.message);
            return res.status(400).json({
                success: false,
                message: "Invalid product data.",
                errors: validationErrors,
            });
        }



        // Create product in database
        const product = await Product.create(value);



        // Send success response
        res.status(201).json({
            success: true,
            message: "Product created successfully!",
            data: product,
        });

    } catch (err) {
        console.error("Error creating product:", err.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong while creating the product.",
        });
    }

};











/********** Update  product controller is here **********/
const updateProfileInfo = async (req, res) => {


    try {

        const { id } = req.params;

        // Validate product ID format
        if (!id || id.length !== 24) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID format.",
            });
        }



        // Validate body data with Joi
        const { error, value } = ProfileSchama.validate(req.body, { abortEarly: false });



        if (error) {
            const validationErrors = error.details.map((err) => err.message);
            return res.status(400).json({
                success: false,
                message: "Invalid product data.",
                errors: validationErrors,
            });
        }



        // Update the product
        const updatedProduct = await Product.findByIdAndUpdate(id, value, {
            new: true, // return updated document
            runValidators: true, // enforce schema validation
        });



        //If not found
        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found.",
            });
        }


        //Success response
        res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            data: updatedProduct,
        });


    } catch (err) {
        console.error("Error updating product:", err.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong while updating the product.",
        });
    }


};










/********** Delete  product controller is here **********/
const deleteProfileInfo = async (req, res) => {


    try {


        const { id } = req.params;

        // Validate product ID format
        if (!id || id.length !== 24) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID format.",
            });
        }



        // Attempt to delete the product
        const deletedProduct = await Product.findByIdAndDelete(id);



        //If no product found
        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found.",
            });
        }



        //Success response
        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
            data: deletedProduct,
        });


    } catch (err) {
        console.error("Error deleting product:", err.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong while deleting the product.",
        });
    }


};









/*********** modules export from here ************/
export {
    createProfileInfo, deleteProfileInfo, getAllUserProfileInfo,
    getSingleUserProfileInfo, updateProfileInfo
};

