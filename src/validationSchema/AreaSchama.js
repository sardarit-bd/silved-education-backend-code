// validations/review.validation.js
import Joi from "joi";

const AreaSchama = Joi.object({


    areaName: Joi.string().required().messages({
        "any.required": "Area Name is required",
    }),

    description: Joi.string().required().max(100).messages({
        "any.required": "Description is required",
    }),

    subareas: Joi.array().items(Joi.string()).required().messages({
        "any.required": "Subareas are required",
    }),

});


export default AreaSchama;
