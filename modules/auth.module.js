const express = require("express");
const router = express.Router();
const authenticationController = require("../controllers/authenticationController");

router.post("/login", authenticationController.loginUser);
router.post("/registration", authenticationController.createUser);

module.exports = router;
