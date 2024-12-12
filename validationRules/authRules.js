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
      addError("email", "Email is required!");
    }
    if (email !== undefined && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      addError("email", "Invalid email format!");
    }
  }

  function isFirstnameValid(firstname) {
    if (firstname === undefined || firstname === "") {
      addError("firstname", "Firstname is required!");
    }

    if (firstname !== undefined && firstname.length < 2) {
      addError("firstname", "Firstname should be less than length 2 chars!");
    }

    if (firstname !== undefined && firstname.length > 20) {
      addError(
        "firstname",
        "Field username max length should be no more than 20"
      );
    }

    if (
      firstname !== undefined &&
      !/^[a-zA-Zа-яА-ЯёЁіІїЇґҐ]+$/.test(firstname)
    ) {
      addError("firstname", "Username can only contain letters");
    }

    if (firstname.trim() !== firstname) {
      addError("firstname", "Username cannot have leading or trailing spaces");
    }
  }

  function isSecondNameValid(secondname) {
    if (secondname === undefined || secondname === "") {
      addError("secondname", "Secondname is required!");
    }

    if (secondname !== undefined && secondname.length < 2) {
      addError("secondname", "Secondname should be less than length 2 chars!");
    }

    if (secondname !== undefined && secondname.length > 20) {
      addError(
        "secondname",
        "Field secondname max length should be no more than 20"
      );
    }

    if (
      secondname !== undefined &&
      !/^[a-zA-Zа-яА-ЯёЁіІїЇґҐ]+$/.test(secondname)
    ) {
      addError("secondname", "Secondname can only contain letters");
    }

    if (secondname.trim() !== secondname) {
      addError(
        "secondname",
        "Secondname cannot have leading or trailing spaces"
      );
    }
  }

  function isLastnameValid(lastname) {
    if (lastname === undefined || lastname === "") {
      addError("lastname", "Lastname is required!");
    }

    if (lastname !== undefined && lastname.length < 2) {
      addError("lastname", "Lastname should be less than length 2 chars!");
    }

    if (lastname !== undefined && lastname.length > 20) {
      addError(
        "lastname",
        "Field lastname max length should be no more than 20"
      );
    }

    if (lastname !== undefined && !/^[a-zA-Zа-яА-ЯёЁіІїЇґҐ]+$/.test(lastname)) {
      addError("lastname", "Lastname can only contain letters");
    }

    if (lastname.trim() !== lastname) {
      addError("lastname", "lastname cannot have leading or trailing spaces");
    }
  }

  function isPasswordValid(password) {
    if (password === undefined || password === "") {
      addError("password", "Password is required!");
    }

    if (password !== undefined && password.length < 6) {
      addError("password", "Password should be more than length 6 chars!");
    }

    if (password !== undefined && password.length >= 20) {
      addError("password", "Password should be less than length 20 chars!");
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
    isPasswordValid(req.body.password);
  }

  return Object.keys(responseErrors.errors).length > 0 ? responseErrors : null;
}

module.exports = isValidateAuth;
