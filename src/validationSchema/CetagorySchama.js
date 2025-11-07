// validations/review.validation.js
import Joi from "joi";

const CetagorySchama = Joi.object({


    categoryName: Joi.string().required().messages({
        "any.required": "Category Name is required",
    }),

    description: Joi.string().required().max(100).messages({
        "any.required": "Description is required",
    }),

    subcategories: Joi.array().items(Joi.string()).required().messages({
        "any.required": "Subcategories are required",
    }),

});


export default CetagorySchama;
