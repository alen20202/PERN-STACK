const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware to verify JWT token
module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("jwt_token");

  // Check if token is missing
  if (!token) {
    return res.status(403).json({ msg: "Authorization denied. No token provided." });
  }

  try {
    // Verify token using JWT secret
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request object
    req.user = verified.user;
    next();
  } catch (err) {
    console.error("JWT Verification Error:", err.message);
    res.status(401).json({ msg: "Invalid token." });
  }
};
