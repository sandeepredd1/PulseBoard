const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // 1. Try to get token from cookie
    let token = req.cookies?.token;

    // 2. If no cookie token, try Authorization header
    if (!token) {
      const authHeader = req.headers.authorization;

      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    // 3. No token found
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    // 4. Verify JWT
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // 5. Attach user information
    req.user = decoded;

    next();
  } catch (error) {
    console.error("JWT authentication error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;