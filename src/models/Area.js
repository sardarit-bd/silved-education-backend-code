import mongoose from "mongoose";

const areaSchema = new mongoose.Schema(
    {


        areaName: {
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

        subareas: {
            type: Array,
            required: true,
        },
    },
    {
        timestamps: true, // adds createdAt and updatedAt automatically
    }
);

// Prevent redefining in watch mode / hot reload
const Area = mongoose.models.Area || mongoose.model("Area", areaSchema);

export default Area;
