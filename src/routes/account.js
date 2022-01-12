const express = require("express");
const accountController = require("../controllers/account");
const validate = require("../middleware/validate");
const UserScheme = require("../schemes/user");

const router = express.Router();

router.put("/", validate(UserScheme.update), accountController.update);
router.put("/password", validate(UserScheme.changePassword), accountController.changePassword);

module.exports = router;