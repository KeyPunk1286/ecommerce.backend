const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const validateNewUser = require("../middlewares/userValidationMiddleware.js");

//=== get all Users
router.get("/all", userController.getAllUsers);

//=== get  Users paginated
router.get("/", userController.getUsersPaginated);

//=== get  Users by ID
router.get("/:id", userController.getUserById);

//=== created User
router.post("/", validateNewUser(false), userController.createUsers);

//=== update  Users
router.put("/:id", validateNewUser(true), userController.updateUser);

//=== delete  Users
router.delete("/:id", userController.deleteUser);

module.exports = router;
