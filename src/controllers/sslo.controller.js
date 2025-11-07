import { ssloSchema } from "../validationSchema/sslo.validation.js";

const generateSSLO = async (req, res) => {
    try {
        // ✅ Validate data
        const { error, value } = ssloSchema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: error.details.map((e) => e.message),
            });
        }

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

        // ✅ Build the generated objective
        const objective = `Students will be able to ${selectedStandard} by ${workforceTask}, and using ${employabilitySkills.join(
            ", "
        )}.`;

        // ✅ Full structured response
        return res.status(200).json({
            success: true,
            message: "SSLO Generated Successfully",
            data: {
                program,
                standardsFramework,
                standardsType,
                abeNrsLevel,
                industry,
                objective,
                supports: supports || [],
                notes: notes || "",
            },
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};


export default generateSSLO;
