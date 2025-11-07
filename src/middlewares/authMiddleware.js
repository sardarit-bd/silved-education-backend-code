import jwt from "jsonwebtoken";



/************** Protect routes (require login) **************/
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  const token = authHeader.trim().split(/\s+/)[1];


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // store user info in req.user
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};




/**************** Role-based access control ***************/
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access forbidden: insufficient rights" });
    }
    next();
  };
};



/*********** module export from here ************/
export { authorize, protect };

