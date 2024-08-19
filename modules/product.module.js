const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

//=== get all product
router.get("/all", productController.getAllProducts);

//=== get  product paginated
router.get("/", productController.getProductsPaginated);

//=== get product by ID
router.get("/:id", productController.getProductById);

//=== get all product by shop ID
router.get("/shop/:id", productController.getProductByShopId);

//=== create new product
router.post("/", productController.createNewProduct);

//=== update product
router.put("/:id", productController.updateProduct);

//=== delete product
router.delete("/:id", productController.deleteProduct);

module.exports = router;
