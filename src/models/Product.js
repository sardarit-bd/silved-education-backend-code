import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
            default: "",
        },

        category: {
            type: String,
            required: true,
            trim: true,
        },

        subcategory: {
            type: String,
            required: true,
            trim: true,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        discount: {
            type: Number,
            min: 0,
            default: 0,
        },

        status: {
            type: String,
            enum: ["published", "pending", "rejected"],
            default: "pending",
        },

        about: {
            type: String,
            required: true,
            trim: true,
            default: "",
        },

        license: {
            type: String,
            required: true,
            trim: true,
        },

        insurance: {
            type: String,
            required: true,
            trim: true,
        },

        categories: {
            type: [String], // Array of category names or IDs
            required: true,
            validate: {
                validator: (arr) => Array.isArray(arr) && arr.length > 0,
                message: "At least one category is required",
            },
        },

        areas: {
            type: [String], // Array of service areas
            required: true,
            validate: {
                validator: (arr) => Array.isArray(arr) && arr.length > 0,
                message: "At least one area is required",
            },
        },

        serviceImageUrls: {
            type: [String], // Array of image URLs
            default: [],
        },
    },
    {
        timestamps: true, // adds createdAt and updatedAt automatically
    }
);

// Create the model (prevent redefining if hot-reloading)
const Product =
    mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
