import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
/**
 * Generates a JWT token for the given user and sets it as a cookie in the response.
 *
 * @param {Object} user - The user object.
 * @param {string} user._id - The unique identifier of the user.
 * @param {Object} res - The response object.
 * @param {Function} res.cookie - Function to set a cookie in the response.
 * @returns {string} The generated JWT token.
 */

export const generateToken = (user, res) => {
  const token = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );

  res.cookie("token", token, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    samSite: "strict",
    secure: process.env.NODE_ENV === "production" ? true : false,
  });

  return token;
};
