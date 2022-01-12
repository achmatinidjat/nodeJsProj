const express = require("express");
const usersController = require("../controllers/user");

const router = express.Router();

router.get("/", usersController.list);
router.get("/search", usersController.search);
router.delete("/:id", usersController.delete);
router.post("/:id/role", usersController.setRole);

module.exports = router;
