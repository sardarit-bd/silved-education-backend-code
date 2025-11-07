import Joi from "joi";

// Register validation schema
export const registerSchema = Joi.object({
    name: Joi.string().min(2).max(50).required().messages({
        "string.base": "Name must be a text",
        "string.empty": "Name is required",
        "string.min": "Name must be at least 2 characters long",
        "any.required": "Name is required",
    }),

    email: Joi.string().email().required().messages({
        "string.email": "Email must be valid",
        "any.required": "Email is required",
    }),

    password: Joi.string().min(6).max(50).required().messages({
        "string.min": "Password must be at least 6 characters long",
        "string.empty": "Password is required",
        "any.required": "Password is required",
    }),
    role: Joi.string().valid("user", "provider", "admin").required().messages({
        "any.only": "Role must be either 'user' or 'provider' or 'admin'",
        "any.required": "Role is required",
    }),
});

// Login validation schema
export const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Email must be valid",
        "any.required": "Email is required",
    }),

    password: Joi.string().min(6).max(50).required().messages({
        "string.min": "Password must be at least 6 characters long",
        "string.empty": "Password is required",
        "any.required": "Password is required",
    }),
    role: Joi.string().valid("user", "provider", "admin").required().messages({
        "any.only": "Role must be either 'user' or 'provider' or 'admin'",
        "any.required": "Role is required",
    }),
});

// Forgot password validation schema
export const forgotPasswordSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Email must be valid",
        "any.required": "Email is required",
    }),
});