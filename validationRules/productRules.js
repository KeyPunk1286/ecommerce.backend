const Product = require("../models/product.model");
const Shop = require("../models/shop.model");

async function isValidateNewProduct(req) {
  const responseErrors = {
    success: false,
    errors: {},
  };

  function addError(field, message) {
    if (!responseErrors.errors[field]) responseErrors.errors[field] = [];
    responseErrors.errors[field].push(message);
  }

  function isTitleValid(title) {
    if (title === undefined || title === "") {
      addError("title", "Field title is required!");
    }
    if (title.length > 20) {
      addError("title", "Field title max length should be no more than 20");
    }
    if (title.trim() !== title) {
      addError("title", "Field title should not start or end with spaces");
    }
  }
  async function isShopIdValid(shopId) {
    if (shopId === undefined || shopId === "") {
      addError("shop_id", "Select shop_id is required!");
    }

    if (isNaN(shopId)) {
      addError("shop_id", "Shop ID must be a valid number!");
    }

    if (shopId) {
      const findShopId = await Shop.findByPk(shopId);
      if (!findShopId) {
        addError("shop_id", "Shop with this ID does not exist.");
      }
    }
  }

  function isDescriptionValid(description) {
    if (description === undefined || description === "") {
      addError("description", "Description is required!");
    }

    if (description.length < 10) {
      addError(
        "description",
        "Description must be at least 10 characters long!"
      );
    }

    if (description.length > 500) {
      addError("description", "Description must not exceed 500 characters!");
    }
  }
  function isPriceValid(price) {
    if (price === undefined || price === "") {
      addError("price", "Price is required!");
    }

    if (isNaN(price)) {
      addError("price", "Price must be a valid number.");
    }

    if (price <= 0) {
      addError("price", "Price must be greater than zero.");
    }

    if (!/^\d+(\.\d{1,2})?$/.test(price)) {
      addError("price", "Price can have up to two decimal places.");
    }
  }

  isTitleValid(req.body.title);
  await isShopIdValid(req.body.shop_id);
  isDescriptionValid(req.body.description);
  isPriceValid(req.body.price);

  return Object.keys(responseErrors.errors).length > 0 ? responseErrors : null;
}

module.exports = isValidateNewProduct;
