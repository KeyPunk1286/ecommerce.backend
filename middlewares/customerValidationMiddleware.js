const User = require("../models/user.model");
const Customer = require("../models/customer.model");

async function isValidateNewCustomer(req, res, next, isUpdating = false) {
  const responseErrors = {
    success: false,
    errors: {},
  };

  function addError(field, message) {
    if (!responseErrors.errors[field]) responseErrors.errors[field] = [];
    responseErrors.errors[field].push(message);
  }

  async function isTitleValid(title) {
    if (title === undefined || title === "") {
      addError("title", "Title is required!");
    }
    if (title !== undefined && title.length > 20) {
      addError("title", "Field title max length should be no more than 20");
    }
    if (title && title.trim() !== title) {
      addError("title", "Field title should not start or end with spaces");
    }
    if (title && !isUpdating) {
      const customerTitle = await Customer.findOne({ where: { title: title } });
      if (customerTitle) {
        addError("title", "A customer with this title already exists.");
      }
    }
  }

  async function isUserIdValid(userId) {
    if (userId === undefined || userId === "") {
      addError("user_id", "User_id is required!");
    }
    if (userId !== undefined && !/^\d+$/.test(userId)) {
      addError("user_id", "The user_id value must be an integer.");
    }
    if (userId) {
      const findUserId = await User.findByPk(userId);
      if (!findUserId) {
        addError("user_id", "User with this ID does not exist.");
      }
    }
  }

  function isStatusValid(status) {
    if (status === undefined || status === "") {
      addError("status", "The customer status is required.");
    }
    if (!["active", "inactive"].includes(status)) {
      addError("status", "Invalid status value.");
    }
  }

  await isTitleValid(req.body.title);
  await isUserIdValid(req.body.user_id);
  isStatusValid(req.body.status);

  if (Object.keys(responseErrors.errors).length > 0) {
    res.status(400).json(responseErrors);
    return;
  } else {
    next();
  }
}

const validateNewCustomer =
  (isUpdating = false) =>
  async (req, res, next) =>
    await isValidateNewCustomer(req, res, next, isUpdating);

module.exports = validateNewCustomer;
