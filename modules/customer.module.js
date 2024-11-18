const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customersController");
const validateNewCustomer = require("../middlewares/customerValidationMiddleware");

//=== get all customers
router.get("/all", customerController.getAllCustomers);

//=== get customers paginated
router.get("/", customerController.getCustomersPaginated);

//=== customer by ID
router.get("/:id", customerController.getCustomerById);

//=== customer by user ID
router.get("/user/:userId", customerController.getCustomerByUserId);

//===  create customer
router.post("/", validateNewCustomer(false), customerController.createCustomer);

//===  update customer
router.put(
  "/:id",
  validateNewCustomer(true),
  customerController.updateCustomer
);

//===  delete customer
router.delete("/:id", customerController.deleteCustomer);

module.exports = router;
