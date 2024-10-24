const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

exports.createUser = async (req, res) => {
  const { email, firstname, secondname, lastname, password } = req.body;

  // Validation
  const responseErrors = {
    success: false,
    errors: [],
  };

  // Email (login)  =====================
  if (email === undefined || email === "") {
    responseErrors.errors = {
      ...responseErrors.errors,
      email: ["Email is required!"],
    };
  }
  if (email !== undefined && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    responseErrors.errors = {
      ...responseErrors.errors,
      email: ["Invalid email format!"],
    };
  }

  // Firstname (username) =====================
  if (firstname === undefined || firstname === "") {
    responseErrors.errors = {
      ...responseErrors.errors,
      firstname: ["Firstname is required!"],
    };
  }

  if (firstname !== undefined && firstname.length < 2) {
    responseErrors.errors = {
      ...responseErrors.errors,
      firstname: ["Firstname should be less than length 2 chars!"],
    };
  }

  if (firstname !== undefined && firstname.length > 20) {
    responseErrors.errors = {
      ...responseErrors.errors,
      firstname: ["Field username max length should be no more than 20"],
    };
  }

  if (firstname !== undefined && !/^[a-zA-Zа-яА-ЯёЁіІїЇґҐ]+$/.test(firstname)) {
    responseErrors.errors = {
      ...responseErrors.errors,
      firstname: ["Username can only contain letters"],
    };
  }

  if (firstname.trim() !== firstname) {
    responseErrors.errors = {
      ...responseErrors.errors,
      firstname: ["Username cannot have leading or trailing spaces"],
    };
  }

  // Secondname =========================
  if (secondname === undefined || secondname === "") {
    responseErrors.errors = {
      ...responseErrors.errors,
      secondname: ["Secondname is required!"],
    };
  }

  if (secondname !== undefined && secondname.length < 2) {
    responseErrors.errors = {
      ...responseErrors.errors,
      secondname: ["Secondname should be less than length 2 chars!"],
    };
  }

  if (secondname !== undefined && secondname.length > 20) {
    responseErrors.errors = {
      ...responseErrors.errors,
      secondname: ["Field secondname max length should be no more than 20"],
    };
  }

  if (
    secondname !== undefined &&
    !/^[a-zA-Zа-яА-ЯёЁіІїЇґҐ]+$/.test(secondname)
  ) {
    responseErrors.errors = {
      ...responseErrors.errors,
      secondname: ["Secondname can only contain letters"],
    };
  }

  if (secondname.trim() !== secondname) {
    responseErrors.errors = {
      ...responseErrors.errors,
      secondname: ["Secondname cannot have leading or trailing spaces"],
    };
  }

  // Lastname =========================
  if (lastname === undefined || lastname === "") {
    responseErrors.errors = {
      ...responseErrors.errors,
      lastname: ["Lastname is required!"],
    };
  }

  if (lastname !== undefined && lastname.length < 2) {
    responseErrors.errors = {
      ...responseErrors.errors,
      lastname: ["Lastname should be less than length 2 chars!"],
    };
  }

  if (lastname !== undefined && lastname.length > 20) {
    responseErrors.errors = {
      ...responseErrors.errors,
      lastname: ["Field lastname max length should be no more than 20"],
    };
  }

  if (lastname !== undefined && !/^[a-zA-Zа-яА-ЯёЁіІїЇґҐ]+$/.test(lastname)) {
    responseErrors.errors = {
      ...responseErrors.errors,
      lastname: ["Lastname can only contain letters"],
    };
  }

  if (lastname.trim() !== lastname) {
    responseErrors.errors = {
      ...responseErrors.errors,
      lastname: ["lastname cannot have leading or trailing spaces"],
    };
  }

  // Password ===============================
  if (password === undefined || password === "") {
    responseErrors.errors = {
      ...responseErrors.errors,
      password: ["Password is required!"],
    };
  }

  if (password !== undefined && password.length < 6) {
    responseErrors.errors = {
      ...responseErrors.errors,
      password: ["Password should be more than length 6 chars!"],
    };
  }

  if (password !== undefined && password.length >= 20) {
    responseErrors.errors = {
      ...responseErrors.errors,
      password: ["Password should be less than length 20 chars!"],
    };
  }

  if (
    Object.values(responseErrors.errors).some(
      (errorArray) => errorArray.length > 0
    )
  ) {
    res.status(401).json(responseErrors);
    return;
  }

  // =====   End Validation ===============

  try {
    // const { firstname, secondname, lastname, email, password } = req.body;

    // Перевіряємо, чи існує користувач з такою електронною поштою
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists!" });
    }

    // Хешуємо пароль
    const hashedPassword = await bcrypt.hash(password, 7);

    // Створюємо нового користувача
    const newUser = await User.create({
      email,
      firstname,
      secondname,
      lastname,
      password: hashedPassword,
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const responseErrors = {
    success: false,
    errors: [],
  };

  console.log(req.body);

  if (req.body.email === undefined || req.body.email === "") {
    responseErrors.errors = {
      ...responseErrors.errors,
      email: ["Field Email is required!"],
    };
  }

  if (
    req.body.email !== undefined &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)
  ) {
    responseErrors.errors = {
      ...responseErrors.errors,
      email: ["Invalid email format!"],
    };
  }

  if (req.body.password === undefined || req.body.password === "") {
    responseErrors.errors = {
      ...responseErrors.errors,
      password: ["Field Password is required!"],
    };
  }
  if (req.body.password !== undefined && req.body.password.length < 6) {
    responseErrors.errors = {
      ...responseErrors.errors,
      password: ["Field Email min length should be not less than 6"],
    };
  }
  if (req.body.password !== undefined && req.body.password.length > 20) {
    responseErrors.errors = {
      ...responseErrors.errors,
      password: ["Field Email should be not more than 20"],
    };
  }

  if (
    Object.values(responseErrors.errors).every(
      (errorArray) => errorArray.length > 0
    )
  ) {
    res.status(401).json(responseErrors);
    return;
  }

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
