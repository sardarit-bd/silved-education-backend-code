import Joi from "joi";

const profileSchema = Joi.object({
    fullName: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
        .pattern(/^[0-9]{10,15}$/)
        .message("Phone number must contain 10–15 digits")
        .optional(),
    address: Joi.string().max(255).optional(),
    bio: Joi.string().max(500).allow("").optional(),
    avatar: Joi.string().uri().optional(),
    gender: Joi.string().valid("male", "female", "other").optional(),
    dateOfBirth: Joi.date().iso().optional(),
    occupation: Joi.string().max(100).optional(),
    status: Joi.string().valid("active", "inactive").default("active"),
    socialLinks: Joi.object({
        facebook: Joi.string().uri().optional(),
        instagram: Joi.string().uri().optional(),
        twitter: Joi.string().uri().optional(),
        linkedin: Joi.string().uri().optional(),
    }).optional(),
});

export default profileSchema;
