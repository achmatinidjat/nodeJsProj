const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");
const bcrypt = require("bcrypt");

const Table = sequelize.define("table",{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey:true,
        allowNull: false
    },
    discipline_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    teacher_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
});
module.exports = Table;