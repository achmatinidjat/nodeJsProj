const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");
const bcrypt = require("bcrypt");

const Grades = sequelize.define("grades",{
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
    },
    grade: {
        type: Sequelize.INTEGER,
    },
    teacher_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }




});

module.exports = Grades;