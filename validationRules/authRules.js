function isValidateAuth(req, loginUser = false) {
  const responseErrors = {
    success: false,
    errors: {},
  };

  function addError(field, message) {
    if (!responseErrors.errors[field]) responseErrors.errors[field] = [];
    responseErrors.errors[field].push(message);
  }

  function isEmailValid(email) {
    if (email === undefined || email === "") {
      addError("email", "Field email is required!");
    }
    if (email !== undefined && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      addError("email", "Invalid email format!");
    }
  }

  function isFirstnameValid(firstname) {
    if (firstname === undefined || firstname === "") {
      addError("firstname", "Field first name is required!");
    }

    if (firstname !== undefined && firstname.length < 2) {
      addError(
        "firstname",
        "Field first name min length should be not less than 2"
      );
    }

    if (firstname !== undefined && firstname.length > 20) {
      addError(
        "firstname",
        "Field first name max length should be no more than 20"
      );
    }

    if (
      firstname !== undefined &&
      !/^[a-zA-Zа-яА-ЯёЁіІїЇґҐ]+$/.test(firstname)
    ) {
      addError("firstname", "First name can only contain letters");
    }

    if (firstname.trim() !== firstname) {
      addError(
        "firstname",
        "First name cannot have leading or trailing spaces"
      );
    }
  }

  function isSecondNameValid(secondname) {
    if (secondname === undefined || secondname === "") {
      addError("secondname", "Field second name is required!");
    }

    if (secondname !== undefined && secondname.length < 2) {
      addError(
        "secondname",
        "Field second name min length should be not less than 2"
      );
    }

    if (secondname !== undefined && secondname.length > 20) {
      addError(
        "secondname",
        "Field second name max length should be no more than 20"
      );
    }

    if (
      secondname !== undefined &&
      !/^[a-zA-Zа-яА-ЯёЁіІїЇґҐ]+$/.test(secondname)
    ) {
      addError("secondname", "Second name can only contain letters");
    }

    if (secondname.trim() !== secondname) {
      addError(
        "secondname",
        "Second name cannot have leading or trailing spaces"
      );
    }
  }

  function isLastnameValid(lastname) {
    if (lastname === undefined || lastname === "") {
      addError("lastname", "Field last name is required!");
    }

    if (lastname !== undefined && lastname.length < 2) {
      addError(
        "lastname",
        "Field last name min length should be not less than 2"
      );
    }

    if (lastname !== undefined && lastname.length > 20) {
      addError(
        "lastname",
        "Field last name max length should be no more than 20"
      );
    }

    if (lastname !== undefined && !/^[a-zA-Zа-яА-ЯёЁіІїЇґҐ]+$/.test(lastname)) {
      addError("lastname", "Last name can only contain letters");
    }

    if (lastname.trim() !== lastname) {
      addError("lastname", "Last name cannot have leading or trailing spaces");
    }
  }

  function isPasswordValid(password) {
    if (password === undefined || password === "") {
      addError("password", "Field Password is required!");
    }

    if (password !== undefined && password.length < 6) {
      addError(
        "password",
        "Field Password min length should be not less than 6"
      );
    }

    if (password !== undefined && password.length >= 20) {
      addError("password", "Field Password should be not more than 20");
    }
  }

  function isPasswordValidRegistration(password) {
    if (password.length < 1) {
      addError("password", "Field password is required!");
    }

    if (password.length < 8) {
      addError("password", "Password must be at least 8 characters long.");
    }

    if (!/[A-Z]/.test(value)) {
      addError(
        "password",
        "Password must contain at least one uppercase letter."
      );
    }

    if (!/[a-z]/.test(value)) {
      addError(
        "password",
        "Password must contain at least one lowercase letter."
      );
    }

    if (!/[0-9]/.test(value)) {
      addError("password", "Password must contain at least one digit.");
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      addError(
        "password",
        "Password must contain at least one special character."
      );
    }
  }
  if (loginUser === true) {
    isEmailValid(req.body.email);
    isPasswordValid(req.body.password);
  } else {
    isEmailValid(req.body.email);
    isFirstnameValid(req.body.firstname);
    isSecondNameValid(req.body.secondname);
    isLastnameValid(req.body.lastname);
    isPasswordValidRegistration(req.body.password);
  }

  return Object.keys(responseErrors.errors).length > 0 ? responseErrors : null;
}

module.exports = isValidateAuth;
