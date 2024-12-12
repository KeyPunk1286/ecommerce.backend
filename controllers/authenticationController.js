const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const isValidate = require("../validationRules/authRules.js");

exports.createUser = async (req, res) => {
  //=== valid ===
  const validation = isValidate(req, false);
  if (validation) return res.status(401).json(validation);
  // =====   End Validation ===============

  try {
    // const { firstname, secondname, lastname, email, password } = req.body;

    // Перевіряємо, чи існує користувач з такою електронною поштою
    const existingUser = await User.findOne({
      where: { email: req.body.email },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists!" });
    }

    // Хешуємо пароль
    const hashedPassword = await bcrypt.hash(req.body.password, 7);

    // Створюємо нового користувача
    const newUser = await User.create({
      email: req.body.email,
      firstname: req.body.firstname,
      secondname: req.body.secondname,
      lastname: req.body.lastname,
      password: hashedPassword,
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  // === valid ===
  const validation = isValidate(req, true);
  if (validation) return res.status(401).json(validation);
  // === end valid ===

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
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
