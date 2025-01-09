import User from "../models/user.model.js";

import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const validEmail = /\S+@\S+\.\S+/;

    if (!username || !email || !password)
      return res.status(400).json({ message: "Please fill in all fields" });
    if (!validEmail.test(email))
      return res.status(400).json({ message: "Invalid email" });
    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    const user = await User.find({ email });
    if (!user) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const PROFILE_PIC = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const random = Math.floor(Math.random() * PROFILE_PIC.length - 1);
    const profilePic = PROFILE_PIC[random];
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      image: profilePic,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
