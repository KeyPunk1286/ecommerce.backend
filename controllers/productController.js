const Product = require("../models/product.model");
const Shop = require("../models/shop.model");

exports.createNewProduct = async (req, res) => {
  try {
    const { shop_id, title, description, price } = req.body;
    if (!shop_id || !title || !description || !price) {
      res.status(400).json({
        message: "Shop ID, title, description, and price are required",
      });
      return;
    }
    const shop = await Shop.findByPk(shop_id);
    if (!shop) {
      res.status(404).json({ message: "Shop not found" });
      return;
    }
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductsPaginated = async (req, res) => {
  try {
    console.log("Function getProductsPaginated called");
    let { page = 1, limit = 10 } = req.query;
    console.log("Received page:", page, "limit:", limit);
    page = parseInt(page);
    limit = parseInt(limit);
    const offset = (page - 1) * limit;
    const totalProducts = await Product.count();
    const products = await Product.findAll({
      limit: limit,
      offset: offset,
    });
    const totalPages = Math.ceil(totalProducts / limit);
    res.status(200).json({
      data: products,
      meta: {
        totalItems: totalProducts,
        totalPages: totalPages,
        currenPage: page,
        itemPerPage: limit,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const productById = await Product.findByPk(req.params.id);
    if (!productById) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json(productById);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductByShopId = async (req, res) => {
  try {
    const shopID = req.params.id;
    const products = await Product.findAll({ where: { shop_id: shopID } });
    if (products.length === 0) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    console.log("Шукаю помилку!!!!", productId);
    if (!productId) {
      res.status(400).json({ message: "Shop ID is required" });
      return;
    }
    const productUpdate = await Product.findByPk(productId);
    if (!productUpdate) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    await productUpdate.update(req.body);
    res.status(200).json(productUpdate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productForDelete = await Product.findByPk(req.params.id);
    if (!productForDelete) {
      res.status(400).json({ message: "Product not found" });
      return;
    }
    await productForDelete.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
