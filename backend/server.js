const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/electromart")
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB Connection Error:", err));
console.log("Database connected");

const User = require("./models/User");

// CREATES NEW ACCOUNT
app.post("/signup", async (req, res) => {
  try {
    console.log("Signup body:", req.body);
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({ error: "All fields required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullname,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Signup Error:", err); // <-- this will show the real error
    res.status(500).json({ error: err.message });
  }
});

// LOGIN USER
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({
      message: "User not found",
    });
  }

  const token = jwt.sign({ userId: user._id }, "secretkey", {
    expiresIn: "1h",
  });
  res.json({
    token,
    user,
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
