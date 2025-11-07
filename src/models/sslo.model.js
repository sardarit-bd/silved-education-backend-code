import mongoose, { Document, Schema } from "mongoose";

export interface ISSLO extends Document {
    program?: string;
    standardsFramework: string;
    standardsType: string;
    abeNrsLevel: string;
    selectedStandard: string;
    industry: string;
    workforceTask: string;
    employabilitySkills: string[];
    supports?: string[];
    notes?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const ssloSchema = new Schema < ISSLO > (
    {
        program: { type: String, default: "" },

        standardsFramework: { type: String, required: true },
        standardsType: { type: String, required: true },
        abeNrsLevel: { type: String, required: true },
        selectedStandard: { type: String, required: true },

        industry: { type: String, required: true },
        workforceTask: { type: String, required: true },

        employabilitySkills: {
            type: [String],
            required: true,
            validate: [
                (val: string[]) => val.length >= 1 && val.length <= 3,
                "Employability skills must include between 1 and 3 items",
            ],
        },

        supports: { type: [String], default: [] },
        notes: { type: String, default: "" },
    },
    {
        timestamps: true, // auto add createdAt / updatedAt
    }
);

const SSLOModel = mongoose.model < ISSLO > ("SSLO", ssloSchema);

export default SSLOModel;