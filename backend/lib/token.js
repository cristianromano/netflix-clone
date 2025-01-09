import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export const generateToken = (user) => {
  return jsonwebtoken.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

export const verifyToken = (token) => {
  return jsonwebtoken.verify(token, process.env.JWT_SECRET);
};
