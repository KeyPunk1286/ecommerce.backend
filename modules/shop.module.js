const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shopController");

//=== all shop
router.get("/all", shopController.getAllShop);

//=== get shop paginaited
router.get("/", shopController.getShopsPaginated);

//=== shop by ID
router.get("/:id", shopController.getShopById);

//=== shop by customer ID
router.get("/customer/:id", shopController.getShopByCustomerId);

//=== create shop
router.post("/", shopController.createNewShop);

//=== updare shop
router.put("/:id", shopController.updateShop);

//=== delete shop
router.delete("/:id", shopController.deleteShop);

module.exports = router;
