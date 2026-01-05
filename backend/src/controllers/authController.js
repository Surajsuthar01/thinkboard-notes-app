import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ================= REGISTER =================
export const registerUser = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    name = name.trim();
    email = email.trim().toLowerCase();   // 🔑 FIX
    password = password.trim();

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= LOGIN =================
export const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    email = email.trim().toLowerCase();   // 🔑 FIX
    password = password.trim();

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

   const token = jwt.sign(
  {
    id: user._id,
    name: user.name,
    email: user.email
  },
  process.env.JWT_SECRET,
  { expiresIn: "777d" }
);

    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
