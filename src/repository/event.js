const mongoose = require("mongoose");
const eventScheme = require("../schemes/event");

const Event = mongoose.model("Event", eventScheme);

module.exports = Event;