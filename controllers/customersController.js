const Customer = require("../models/customer.model");
const User = require("../models/user.model");
const isValidationCustomer = require("../validationRules/customerRules.js");

exports.createCustomer = async (req, res) => {
  // --- validation ---
  const validation = await isValidationCustomer(req, false);
  if (validation) return res.status(400).json(validation);
  // --- end validation ---
  try {
    const newCustomer = await Customer.create({
      title: req.body.title,
      user_id: req.body.user_id,
      status: req.body.status,
    });
    return res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCustomersPaginated = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const offset = (page - 1) * limit;
    const totalCustomer = await Customer.count();
    const customers = await Customer.findAll({
      limit: limit,
      offset: offset,
    });
    const totalPages = Math.ceil(totalCustomer / limit);
    res.status(200).json({
      data: customers,
      meta: {
        totalItems: totalCustomer,
        totalPages: totalPages,
        currentPage: page,
        itemPerPage: limit,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCustomerById = async (req, res) => {
  try {
    const customerById = await Customer.findByPk(req.params.id);
    if (!customerById) {
      res.status(404).json({ message: "Customer not found" });
      return;
    }
    res.status(200).json(customerById);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCustomerByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    const customers = await Customer.findAll({ where: { user_id: userId } });
    if (customers.length === 0) {
      res.status(404).json({ message: "Customer not found" });
      return;
    }
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCustomer = async (req, res) => {
  // --- validation ---
  const validation = await isValidationCustomer(req, true);
  if (validation) return res.status(400).json(validation);
  // --- end validation ---
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
      res.status(404).json({ message: "Customer not found" });
      return;
    }
    await customer.update(req.body);
    res
      .status(200)
      .json({ message: "Customer update successfully", customer: customer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const customerForDelete = await Customer.findByPk(req.params.id);
    if (!customerForDelete) {
      res.status(404).json({ message: "Customer not found" });
      return;
    }
    await customerForDelete.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
