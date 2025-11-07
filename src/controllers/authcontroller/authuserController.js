import bcrypt from "bcryptjs";
import User from "../../models/User.js";
import generateToken from "../../utils/generateToken.js";
import { loginSchema, registerSchema } from "../../validationSchema/authvalidation.js";



/********************  User registration Controller here ***********************/
const registerUser = async (req, res) => {

  try {


    // Validate body data using Joi schema
    const { error, value: { name, email, password, role } } = registerSchema.validate(req.body, { abortEarly: false });


    // If validation fails, return 400 with all validation errors
    if (error) {
      const validationErrors = error.details.map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Invalid Registration data.",
        errors: validationErrors,
      });
    }


    const userExists = await User.findOne({ email });

    if (userExists) return res.status(409).json({ message: "User already exists" });


    // Hash the password
    const salt = await bcrypt.genSalt(10); // 10 = number of salt rounds
    const hashedPassword = await bcrypt.hash(password, salt);



    // Create user with hashed password
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });


    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role),
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



/******************** Login User Controller here ***********************/

const loginUser = async (req, res) => {
  try {

    // Validate body data using Joi schema
    const { error, value: { email, password, role } } = loginSchema.validate(req.body, { abortEarly: false });


    // If validation fails, return 400 with all validation errors
    if (error) {
      const validationErrors = error.details.map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Authentication failed.",
        errors: validationErrors,
      });
    }



    // Check if user exists
    const user = await User.findOne({ email });


    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }




    if (user?.role !== role) {
      return res.status(401).json({ message: "Role Mismatch" });
    }



    // If valid → return user data and token
    res.json({
      success: true,
      message: "User logged in successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.name, user.role),
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};




// controllers/auth.controller.js
const logoutUser = async (req, res) => {

  try {
    // If you use cookies for auth:
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });

    return res.status(200).json({
      success: true,
      message: "User logged out successfully.",
    });
  } catch (err) {
    console.error("Logout error:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error while logging out.",
    });
  }
};





export {
  loginUser, logoutUser, registerUser
};

