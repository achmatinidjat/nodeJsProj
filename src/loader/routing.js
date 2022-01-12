const errorHandler = require("../middleware/errorHandler");

const express = require("express");
const router = express.Router();

const productRouter = require("../routes/course");
const loginRouter = require("../routes/login");
const logoutRouter = require("../routes/logout");
const accountRouter = require("../routes/account");
const signupRouter = require("../routes/signup");
const usersRouter = require("../routes/user");
const requestForDeleteRouter = require("../routes/deleteRequest");
const isAuthorized = require("../middleware/isAuthorized");
const isAdmin = require("../middleware/isAdmin");
const mongoLogger = require("../helpers/mongoLogger");

router.use(mongoLogger.storeEvent);
router.use("/signup", signupRouter);
router.use("/login", loginRouter);
router.use(isAuthorized);
router.use("/account", accountRouter);
router.use("/logout", logoutRouter);
router.use("/course", productRouter);
router.use("/deleteRequest", requestForDeleteRouter);
router.use(isAdmin);
router.use("/users", usersRouter);
router.use(errorHandler);

module.exports = router;
