const express = require("express");
const authController = require("../controllers/auth");
const validate = require("../middleware/validate");
const UserScheme = require("../schemes/user");

const router = express.Router();

router.post("/", validate(UserScheme.create), authController.signup);

module.exports = router;
