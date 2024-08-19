const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//=== get all Users
router.get("/all", userController.getAllUsers);

//=== get  Users paginated
router.get("/", userController.getUsersPaginated);

//=== get  Users by ID
router.get("/:id", userController.getUserById);

//=== created User
router.post("/", userController.createUsers);

//=== update  Users
router.put("/:id", userController.updateUser);

//=== delete  Users
router.delete("/:id", userController.updateUser);

module.exports = router;
