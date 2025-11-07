import SSLOModel from "../models/sslo.model.js"; // Import your Mongoose Model (assuming path is correct)
import { ssloSchema } from "../validationSchema/sslo.validation.js";

const generateSSLO = async (req, res) => {
    try {
        // 1. ✅ Validate data using Joi (or similar)
        const { error, value } = ssloSchema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: error.details.map((e) => e.message),
            });
        }

        // Destructure validated data
        const {
            program,
            standardsFramework,
            standardsType,
            abeNrsLevel,
            selectedStandard,
            industry,
            workforceTask,
            employabilitySkills,
            supports,
            notes,
        } = value;

        // 2. 💾 Create the new document instance
        const newSSLO = new SSLOModel({
            program,
            standardsFramework,
            standardsType,
            abeNrsLevel,
            selectedStandard,
            industry,
            workforceTask,
            employabilitySkills,
            supports,
            notes,
        });

        // 3. ⭐️ Save the document to the database
        const savedSSLO = await newSSLO.save();

        // 4. ✅ Full structured response (including the objective generation)

        // Build the generated objective using the saved data
        const objective = `Students will be able to ${savedSSLO.selectedStandard} by ${savedSSLO.workforceTask}, and using ${savedSSLO.employabilitySkills.join(
            ", "
        )}.`;

        return res.status(201).json({ // Use 201 for Resource Created
            success: true,
            message: "SSLO Saved and Generated Successfully",
            data: {
                // Include all saved fields from the database, 
                // including _id, createdAt, and updatedAt
                _id: savedSSLO._id,
                program: savedSSLO.program,
                standardsFramework: savedSSLO.standardsFramework,
                standardsType: savedSSLO.standardsType,
                abeNrsLevel: savedSSLO.abeNrsLevel,
                selectedStandard: savedSSLO.selectedStandard,
                industry: savedSSLO.industry,
                workforceTask: savedSSLO.workforceTask,
                employabilitySkills: savedSSLO.employabilitySkills,
                supports: savedSSLO.supports,
                notes: savedSSLO.notes,

                // Add the generated objective text
                objective: objective,

                // Include Mongoose timestamps
                createdAt: savedSSLO.createdAt,
                updatedAt: savedSSLO.updatedAt,
            },
        });
    } catch (err) {
        console.error("Database or Server Error:", err);

        // Handle Mongoose Validation/Casting Errors specifically
        if (err.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: "Database validation failed",
                errors: Object.values(err.errors).map(e => e.message),
            });
        }

        return res.status(500).json({
            success: false,
            message: "Server error during SSLO creation",
        });
    }
};

export default generateSSLO;
