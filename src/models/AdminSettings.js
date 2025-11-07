// models/AdminSettings.js
import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
    maxCategoriesPerProvider: { type: Number, default: 10 },
    maxAreasPerProvider: { type: Number, default: 10 },
    reviewCreditPoint: { type: Number, default: 1 },
});

export default mongoose.model("AdminSettings", settingsSchema);
