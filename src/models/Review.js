import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product", // reference to your Product model
            required: true,
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // reference to your User model
            required: true,
        },

        reviewDescription: {
            type: String,
            required: true,
            trim: true,
            minlength: 10, // optional: ensure at least some detail
        },

        reviewStar: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
    },
    {
        timestamps: true, // adds createdAt and updatedAt automatically
    }
);

// Prevent redefining in watch mode / hot reload
const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

export default Review;
