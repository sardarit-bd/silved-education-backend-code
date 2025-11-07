import SSLOModel from "../../models/sslo.model.js";





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















/*********** modules export from here ************/
export {
  getAllProduct
};

