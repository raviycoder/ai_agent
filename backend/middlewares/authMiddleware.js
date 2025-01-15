import User from "../models/userModel.js";
import { verifyToken } from "../utils/jwtHelper.js";

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Token missing or invalid" });
  }

  const token = authHeader.split(" ")[1];
  try {
    // Decode token
    const decodedToken = verifyToken(token); // Ensure this is exported correctly as a function
    const userId = decodedToken.userId; // Extract userId
    // Validate userId
    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid token payload" });
    }

    // Find user in the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Unauthorized: User not found" });
    }

    // Attach user to request object for downstream middleware
    req.user = user;

    // Proceed to the next middleware
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
