import Product from "../../models/Product.js";
import Review from "../../models/Review.js";
import User from "../../models/User.js";
import productSchema from "../../validationSchema/productSchema.js";






/********** get all product controller is here **********/
const getAllProduct = async (req, res) => {


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






    // For each product, attach its reviews and reviewer info
    const productsWithReviews = await Promise.all(
      products.map(async (product) => {
        // find all reviews for this product
        const reviews = await Review.find({ productId: product._id });

        // attach user info to each review
        const reviewsWithUsers = await Promise.all(
          reviews.map(async (rev) => {
            const user = await User.findById(rev.userId).select("name email");
            return {
              ...rev._doc,
              user: user ? { name: user.name, role: user.role, email: user.email } : null,
            };
          })
        );

        const totalRe = reviews.length > 0 ? reviews.reduce((acc, rev) => acc + rev.reviewStar, 0) : 0;


        return {
          ...product._doc,
          reviews: {
            total: reviews.length,
            analytics: {
              average: reviews.length > 0 ? reviews.reduce((acc, rev) => acc + rev.reviewStar, 0) / reviews.length : 0,
              star5: {
                count: reviews.filter((rev) => rev.reviewStar === 5).length,
                parsentage: reviews.filter((rev) => rev.reviewStar === 5).length > 0 ? Math.floor((reviews.filter((rev) => rev.reviewStar === 5).length / reviews.length) * 100) : 0
              },
              star4: {
                count: reviews.filter((rev) => rev.reviewStar === 4).length,
                parsentage: reviews.filter((rev) => rev.reviewStar === 4).length > 0 ? Math.floor((reviews.filter((rev) => rev.reviewStar === 4).length / reviews.length) * 100) : 0
              },
              star3: {
                count: reviews.filter((rev) => rev.reviewStar === 3).length,
                parsentage: reviews.filter((rev) => rev.reviewStar === 3).length > 0 ? Math.floor((reviews.filter((rev) => rev.reviewStar === 3).length / reviews.length) * 100) : 0
              },
              star2: {
                count: reviews.filter((rev) => rev.reviewStar === 2).length,
                parsentage: reviews.filter((rev) => rev.reviewStar === 2).length > 0 ? Math.floor((reviews.filter((rev) => rev.reviewStar === 2).length / reviews.length) * 100) : 0
              },
              star1: {
                count: reviews.filter((rev) => rev.reviewStar === 1).length,
                parsentage: reviews.filter((rev) => rev.reviewStar === 1).length > 0 ? Math.floor((reviews.filter((rev) => rev.reviewStar === 1).length / reviews.length) * 100) : 0
              },

            },
            reviewsDetails: reviewsWithUsers,
          },
        };
      })
    );






    // Return response
    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
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

