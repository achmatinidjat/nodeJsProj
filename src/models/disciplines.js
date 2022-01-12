const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");
const bcrypt = require("bcrypt");

const Disciplines = sequelize.define("disciplines",{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey:true,
        allowNull: false
    },
    teacher_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING
    }


});
module.exports = Disciplines;