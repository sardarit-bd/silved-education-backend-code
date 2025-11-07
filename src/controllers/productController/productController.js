import Product from "../../models/Product.js";
import Review from "../../models/Review.js";
import SSLOModel from "../../models/SSLO.model.js";
import User from "../../models/User.js";
import productSchema from "../../validationSchema/productSchema.js";





/********** get all product controller is here **********/
const getAllProduct = async (req, res) => {


  try {

    // Extract optional query parameters for filtering/pagination


    const productsWithReviews = await SSLOModel.find();



    // Return response
    res.status(200).json({
      success: true,
      message: "Objective fetched successfully!",
      data: productsWithReviews,
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
const getSingleProduct = async (req, res) => {

  try {
    const { id } = req.params;

    // Validate ID format
    if (!id || id.length !== 24) {
      return res.status(400).json({ error: "Invalid product ID format." });
    }


    // Find product by ID
    const product = await Product.findById(id);
    const review = await Review.find({ productId: id });


    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }



    //find all review users for this product
    const reviewUsers = await Promise.all(
      review.map(async (rev) => {
        const user = await User.findById(rev.userId);

        const finalrview = { ...rev._doc, user: user ? { name: user.name, email: user.email, role: user.role } : null };
        return finalrview;

      })
    );



    const finalres = { ...product._doc, review: reviewUsers ? reviewUsers : [] };






    // Return the product
    res.status(200).json({
      success: true,
      data: finalres,
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
const createProduct = async (req, res) => {

  try {


    // Validate body data using Joi schema
    const { error, value } = productSchema.validate(req.body, { abortEarly: false });


    // If validation fails, return 400 with all validation errors
    if (error) {
      const validationErrors = error.details.map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Invalid product data.",
        errors: validationErrors,
      });
    }


    //  Validate files manually
    if (!req.files?.license || !req.files?.insurance || !req.files?.serviceImages) {
      return res.status(400).json({
        success: false,
        message: "Both license and insurance files are required.",
      });
    }


    // Extract file URLs from Cloudinary (via multer-storage-cloudinary)
    const licenseUrl = req.files.license[0].path;
    const insuranceUrl = req.files.insurance[0].path;
    const serviceImageUrls = req.files.serviceImages.map(file => file.path);





    // Merge validated body + file URLs
    const saveableData = {
      ...value,
      license: licenseUrl,
      insurance: insuranceUrl,
      serviceImageUrls: serviceImageUrls,
    };



    // Create product in database
    const product = await Product.create(saveableData);



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
const updateProduct = async (req, res) => {


  try {

    const { id } = req.params;

    // Validate product ID format
    if (!id || id.length !== 24) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID format.",
      });
    }



    const value = req.body;



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
const deleteProduct = async (req, res) => {


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
  createProduct, deleteProduct, getAllProduct,
  getSingleProduct, updateProduct
};

