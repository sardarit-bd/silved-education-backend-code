import Joi from "joi";

const productSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().allow("").required(),
    category: Joi.string().required(),
    subcategory: Joi.string().required(),
    price: Joi.number().positive().required(),
    discount: Joi.number().min(0).optional(),
    status: Joi.string().valid("published", "pending", "rejected").default("pending"),
    about: Joi.string().allow("").required(),
    categories: Joi.array().items(Joi.string()).min(1).required(),
    areas: Joi.array().items(Joi.string()).min(1).required(),
});

export default productSchema;