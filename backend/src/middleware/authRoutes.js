import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protect = async (req, res, next) => {
  try {
    let token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
