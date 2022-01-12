const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");
const bcrypt = require("bcrypt");

const Teachers = sequelize.define("teachers",{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey:true,
        allowNull: false
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    discipline_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Teachers;