import { validationResult } from "express-validator";


/*************** Middleware to check for validation errors **************/
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};


/*********** modules export from here ***********/
module.exports = validateRequest;
