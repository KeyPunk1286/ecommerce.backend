const Users = require("../models/user.model");

// основна функція для валідації ======================================
const isValidateNewUser = async (req, res, next, isUpdating = false) => {
  const responseErrors = {
    success: false,
    errors: {},
  };

  // функція для додавання помилки до responseErrors.errors ===========
  function addError(field, message) {
    if (!responseErrors.errors[field]) responseErrors.errors[field] = [];
    responseErrors.errors[field].push(message);
  }

  // валідація email ==================================================
  async function isEmailValid(email) {
    if (email === undefined || email === "") {
      addError("email", "Email is required!");
    }
    // if (email !== undefined && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    //   addError("email", "Invalid email format!");
    // }

    if (email && !isUpdating) {
      const existingUser = await Users.findOne({
        where: { email: email },
      });
      if (existingUser) {
        addError("email", "User with this email already exists!");
      }
    }
  }

  // валідація текстових полів ========================================
  function isTextFieldValid(fieldName, value, fieldDisplayName) {
    if (value === undefined || value === "") {
      addError(fieldName, `${fieldDisplayName} is required!`);
    } else {
      if (value !== undefined && value.length < 2) {
        addError(
          fieldName,
          `${fieldDisplayName} should be at least 2 characters!`
        );
      }
      if (value !== undefined && value.length > 20) {
        addError(
          fieldName,
          `${fieldDisplayName} should be no more than 20 characters!`
        );
      }
      if (value !== undefined && !/^[a-zA-Zа-яА-ЯёЁіІїЇґҐ]+$/.test(value)) {
        addError(fieldName, `${fieldDisplayName} can only contain letters`);
      }
      if (value.trim() !== value) {
        addError(
          fieldName,
          `${fieldDisplayName} cannot have leading or trailing spaces`
        );
      }
    }
  }

  // валідація паролю ==================================================
  function isPasswordValid(password) {
    if (password === undefined || password === "") {
      addError("password", "Field password is required!");
    }
    if (password !== undefined && password.length < 8) {
      addError("password", "Password must be at least 8 characters long.");
    }
    if (password !== undefined && !/[A-Z]/.test(password)) {
      addError(
        "password",
        "Password must contain at least one uppercase letter."
      );
    }
    if (password !== undefined && !/[a-z]/.test(password)) {
      addError(
        "password",
        "Password must contain at least one lowercase letter."
      );
    }
    if (password !== undefined && !/[0-9]/.test(password)) {
      addError("password", "Password must contain at least one digit.");
    }
    if (password !== undefined && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      addError(
        "password",
        "Password must contain at least one special character."
      );
    }
  }

  await isEmailValid(req.body.email);
  isTextFieldValid("firstname", req.body.firstname, "Firstname");
  isTextFieldValid("secondname", req.body.secondname, "Secondname");
  isTextFieldValid("lastname", req.body.lastname, "Lastname");
  if (!isUpdating) {
    isPasswordValid(req.body.password);
  }

  if (Object.keys(responseErrors.errors).length > 0) {
    res.status(400).json(responseErrors);
    return;
  } else next();
};

const validateNewUser =
  (isUpdating = false) =>
  async (req, res, next) =>
    await isValidateNewUser(req, res, next, isUpdating);

module.exports = validateNewUser;
