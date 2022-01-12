const Sequelize = require("sequelize");
const config = require("../config/sequelize");

const sequelize = new Sequelize("table", "root","root", config);

module.exports = sequelize;