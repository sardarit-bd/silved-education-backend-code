import Review from "../../models/Review.js";
import reviewSchema from "../../validationSchema/reviewvalidation.js";

const createReview = async (req, res) => {

    try {


        // Validate body data using Joi schema
        const { error, value } = reviewSchema.validate(req.body, { abortEarly: false });


        // If validation fails, return 400 with all validation errors
        if (error) {
            const validationErrors = error.details.map((err) => err.message);
            return res.status(400).json({
                success: false,
                message: "Invalid Review data.",
                errors: validationErrors,
            });
        }



        // Create product in database
        const review = await Review.create(value);



        // Send success response
        res.status(201).json({
            success: true,
            message: "Review Submitted successfully!",
            data: review,
        });

    } catch (err) {
        console.error("Error Submitting Review:", err.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong while submitting the Review.",
        });
    }

};



/*********** modules export from here ************/
export {
    createReview
};

