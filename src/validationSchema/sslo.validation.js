import Joi from "joi";

export const ssloSchema = Joi.object({
    program: Joi.string().allow("").optional(),
    standardsFramework: Joi.string().required(),
    standardsType: Joi.string().required(),
    abeNrsLevel: Joi.string().required(),
    selectedStandard: Joi.string().required(),

    industry: Joi.string().required(),
    workforceTask: Joi.string().required(),
    employabilitySkills: Joi.array()
        .items(Joi.string())
        .min(1)
        .max(3)
        .required(),

    supports: Joi.array().items(Joi.string()).optional(),
    notes: Joi.string().allow("").optional(),
});

export default ssloSchema;