import User from "../models/user.model.js";
import { generateToken } from "../lib/token.js";
import bcrypt from "bcryptjs";

/**
 * Handles user sign-up.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.username - The username of the new user.
 * @param {string} req.body.email - The email of the new user.
 * @param {string} req.body.password - The password of the new user.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves to void.
 *
 * @throws {Error} - If there is an error during the sign-up process.
 */

export const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const validEmail = /\S+@\S+\.\S+/;

    if (!username || !email || !password)
      return res.status(400).json({ message: "Complete todos los campos" });
    if (!validEmail.test(email))
      return res.status(400).json({ message: "email invalido" });
    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "La contraseña debe tener mas de 6 caracteres" });
    const user = await User.find({ email });
    if (!user) return res.status(400).json({ message: "Usuario ya existe!" });

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const PROFILE_PIC = ["avatar1.png", "avatar2.png", "avatar3.png"];
    const random = Math.floor(Math.random() * 3);
    const profilePic = PROFILE_PIC[random];

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      image: profilePic,
    });

    const token = generateToken(newUser, res);

    await newUser.save();
    res
      .status(201)
      .json({ message: "Usuario creado exitosamente!", newUser, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user, res);
    res.status(200).json({
      message: "Signin successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        image: user.image,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signOut = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Signout successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAuthCheck = async (req, res) => {
  try {
    res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
