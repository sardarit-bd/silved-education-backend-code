import mongoose from "mongoose";

// Mongoose Schema for Standards-Based Student Learning Objective (SSLO)

const ssloSchema = new mongoose.Schema(
    {
        // General Information
        program: {
            type: String,
            default: ""
        },

        // Standards Alignment
        standardsFramework: {
            type: String,
            required: true
        },
        standardsType: {
            type: String,
            required: true
        },
        abeNrsLevel: {
            type: String,
            required: true
        },
        selectedStandard: {
            type: String,
            required: true
        },

        // Context and Application
        industry: {
            type: String,
            required: true
        },
        workforceTask: {
            type: String,
            required: true
        },

        // Skills and Constraints
        employabilitySkills: {
            type: [String], // Array of Strings
            required: true,
            // Custom validator to ensure array length is between 1 and 3
            validate: {
                validator: function (val) {
                    return val.length >= 1 && val.length <= 3;
                },
                message: "Employability skills must include between 1 and 3 items",
            },
        },

        // Notes and Supports
        supports: {
            type: [String],
            default: []
        },
        notes: {
            type: String,
            default: ""
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

// Create the Mongoose Model
const SSLOModel = mongoose.model("SSLO", ssloSchema);

export default SSLOModel;