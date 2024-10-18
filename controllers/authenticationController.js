const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");


exports.createUser = async (req, res) => {

  // Validation
  const responseErrors = {
    'success': false,
    'errors': [],
  };

  // Firstname (username) vis required
  if (req.body.username === undefined || req.body.username === "") {
    responseErrors.errors = {...responseErrors.errors, username: ["Firstname is required!"]}
  }
  // Firstname (username) max length = 20
  if (req.body.username !== undefined && req.body.username.length >= 20) {
    responseErrors.errors = {...responseErrors.errors, username: ["Firstname should be less than length 20 chars!"]}
  }

  // Secondname vis required
  if (req.body.secondname === undefined || req.body.secondname === "") {
    responseErrors.errors = {...responseErrors.errors, secondname: ["Secondname is required!"]}
  }
  // Secondname max length = 20
  if (req.body.secondname !== undefined && req.body.secondname.length >= 20) {
    responseErrors.errors = {...responseErrors.errors, secondname: ["Secondname should be less than length 20 chars!"]}
  }

  // Lastname vis required
  if (req.body.lastname === undefined || req.body.lastname === "") {
    responseErrors.errors = {...responseErrors.errors, lastname: ["Lastname is required!"]}
  }
  // Lastname max length = 20
  if (req.body.lastname !== undefined && req.body.lastname.length >= 20) {
    responseErrors.errors = {...responseErrors.errors, lastname: ["Lastname should be less than length 20 chars!"]}
  }

  // Email (login) vis required
  if (req.body.login === undefined || req.body.login === "") {
    responseErrors.errors = {...responseErrors.errors, login: ["Email is required!"]}
  }
  if (req.body.login !== undefined && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.login)) {
    responseErrors.errors = {...responseErrors.errors, login: ["Invalid email format!"]}
  }
  // Email (login) min length = 5
  if (req.body.login !== undefined && req.body.login.length < 5) {
    responseErrors.errors = {...responseErrors.errors, login: ["Email should be more than length 5 chars!"]}
  }
  // Email (login) max length = 50
  if (req.body.login !== undefined && req.body.login.length >= 50) {
    responseErrors.errors = {...responseErrors.errors, login: ["Email should be less than length 50 chars!"]}
  }

  // Password vis required
  if (req.body.password === undefined || req.body.password === "") {
    responseErrors.errors = {...responseErrors.errors, password: ["Password is required!"]}
  }
  // Password min length = 5
  if (req.body.password !== undefined && req.body.password.length < 6) {
    responseErrors.errors = {...responseErrors.errors, password: ["Password should be more than length 6 chars!"]}
  }
  // Password max length = 22
  if (req.body.password !== undefined && req.body.password.length >= 20) {
    responseErrors.errors = {...responseErrors.errors, password: ["Password should be less than length 20 chars!"]}
  }

  if (Object.values(responseErrors.errors).some(errorArray => errorArray.length > 0)) {
    res.status(401).json(responseErrors);
    return;
  }

  // End Validation

  try {
    const { firstname, secondname, lastname, email, password } = req.body;

    // Перевіряємо, чи існує користувач з такою електронною поштою
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: "User with this email already exists!" });
    }

    // Хешуємо пароль
    const hashedPassword = await bcrypt.hash(password, 7);

    // Створюємо нового користувача
    const newUser = await User.create({
      firstname,
      secondname,
      lastname,
      email,
      password: hashedPassword
    });

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
