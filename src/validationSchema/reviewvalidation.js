// validations/review.validation.js
import Joi from "joi";

const reviewSchema = Joi.object({
    productId: Joi.string().required().messages({
        "any.required": "Product ID is required",
    }),

    userId: Joi.string().required().messages({
        "any.required": "User ID is required",
    }),

    reviewDescription: Joi.string().min(10).max(100).required().messages({
        "string.min": "Review description must be at least 10 characters long",
        "string.max": "Review description must be at maximum 100 characters long",
        "any.required": "Review description is required",
    }),

    reviewStar: Joi.number().min(1).max(5).required().messages({
        "number.min": "Rating must be at least 1 star",
        "number.max": "Rating cannot exceed 5 stars",
        "any.required": "Review rating (star) is required",
    }),
});


export default reviewSchema;
