const mongoose = require("mongoose");
const errorScheme = require("../schemes/error");

const Error = mongoose.model("Error", errorScheme);

module.exports = Error;