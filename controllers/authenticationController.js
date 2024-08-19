const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

exports.createUser = async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    const hashedPassword = await bcrypt.hash(password, 7);
    const newUser = await User.create({ ...rest, password: hashedPassword });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
