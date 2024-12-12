const express = require("express");
const router = express.Router();
const authenticationController = require("../controllers/authenticationController.js");

router.post("/login", authenticationController.loginUser);
router.post("/registration", authenticationController.createUser);

module.exports = router;
