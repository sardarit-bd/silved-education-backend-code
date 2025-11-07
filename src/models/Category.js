import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {


        categoryName: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },

        subcategories: {
            type: Array,
            required: true,
        },
    },
    {
        timestamps: true, // adds createdAt and updatedAt automatically
    }
);

// Prevent redefining in watch mode / hot reload
const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
