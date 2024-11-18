const Shop = require("../models/shop.model");
const Customer = require("../models/customer.model");

exports.createNewShop = async (req, res) => {
  try {
    const newShop = await Shop.create({
      customer_id: req.body.customer_id,
      title: req.body.title,
    });
    return res.status(201).json(newShop);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  // try {
  //   const { title, customer_id, is_active } = req.body;
  //   if (!title || !customer_id) {
  //     res.status(400).json({ message: "Title and Customer ID are required" });
  //     return;
  //   }
  //   if (typeof is_active !== "boolean") {
  //     res.status(400).json({ message: "is_active must be a boolean" });
  //     return;
  //   }
  //   const customersExist = await Customer.findByPk(customer_id);
  //   if (!customersExist) {
  //     res.status(400).json({ message: "Customer not found" });
  //     return;
  //   }

  //   const newShop = await Shop.create(req.body);
  //   res.status(201).json(newShop);
  // } catch (error) {
  //   res.status(500).json({ error: error.message });
  // }
};

exports.getAllShop = async (req, res) => {
  try {
    const shops = await Shop.findAll();
    res.status(200).json(shops);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getShopsPaginated = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const offset = (page - 1) * limit;
    const totalShops = await Shop.count();
    const shops = await Shop.findAll({
      limit: limit,
      offset: offset,
    });
    const totalPages = Math.ceil(totalShops / limit);
    res.status(200).json({
      data: shops,
      meta: {
        totalItems: totalShops,
        totalPages: totalPages,
        currentPage: page,
        itemPerPage: limit,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getShopById = async (req, res) => {
  try {
    const shopById = await Shop.findByPk(req.params.id);
    if (!shopById) {
      res.status(404).json({ message: "Shops not found" });
      return;
    }
    res.status(200).json(shopById);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getShopByCustomerId = async (req, res) => {
  try {
    const customerId = req.params.id;
    const shops = await Shop.findAll({ where: { customer_id: customerId } });
    if (shops.length === 0) {
      res.status(404).json({ message: "Shops not found" });
      return;
    }
    res.status(200).json(shops);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateShop = async (req, res) => {
  console.log(req.body.customer_id, req.body.title, req.body.is_active);

  try {
    const shop = await Shop.findByPk(req.params.id);
    if (!shop) {
      res.status(400).json({ message: "Shop not found" });
    }
    await shop.update(req.body);
    res.status(200).json({ message: "Shop update successfully", shop: shop });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  // try {
  //   const shopById = req.params.id;
  //   if (!shopById) {
  //     res.status(400).json({ message: "Shops ID is required" });
  //     return;
  //   }
  //   const { title, is_active } = req.body;
  //   if (typeof title !== "string" || typeof is_active !== "boolean") {
  //     res.status(400).json({ message: "Invalid data format" });
  //     return;
  //   }
  //   const shop = await Shop.findByPk(shopById);
  //   if (!shop) {
  //     res.status(400).json({ message: "Shop not found" });
  //     return;
  //   }
  //   await shop.update(req.body);
  //   res.status(200).json(shop);
  // } catch (error) {
  //   res.status(500).json({ error: error.message });
  // }
};

exports.deleteShop = async (req, res) => {
  try {
    const shopForDelete = await Shop.findByPk(req.params.id);
    if (!shopForDelete) {
      res.status(400).json({ message: "Shop not found" });
      return;
    }
    await shopForDelete.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
