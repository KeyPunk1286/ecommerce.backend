const Shop = require("../models/shop.model");
const Customer = require("../models/customer.model");

async function isValidateNewShop(req, res, next, isUpdating = false) {
  const responseErrors = {
    success: false,
    errors: {},
  };

  function addError(field, message) {
    if (!responseErrors.errors[field]) responseErrors.errors[field] = [];
    responseErrors.errors[field].push(message);
  }

  async function isCustomerIdValid(customerId) {
    if (customerId === undefined || customerId === "") {
      addError("customer_id", "Customer_id is required!");
    }
    if (customerId !== undefined && !/^\d+$/.test(customerId)) {
      addError("customer_id", "The field customer_id must be an integer.");
    }
    if (customerId) {
      const findCustomerId = await Customer.findByPk(customerId);
      if (!findCustomerId) {
        addError("customer_id", "Customer with this ID does not exist.");
      }
    }
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
      const findTitleShop = await Shop.findOne({ where: { title: title } });
      if (findTitleShop) {
        addError("title", "A Shop with this title already exists.");
      }
    }
  }

  await isCustomerIdValid(req.body.customer_id);
  await isTitleValid(req.body.title);

  if (Object.keys(responseErrors.errors).length > 0) {
    res.status(400).json(responseErrors);
    return;
  } else {
    next();
  }
}

const validateNewShop =
  (isUpdating = false) =>
  async (req, res, next) =>
    await isValidateNewShop(req, res, next, isUpdating);

module.exports = validateNewShop;