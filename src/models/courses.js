const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");
const bcrypt = require("bcrypt");

const Courses = sequelize.define("courses",{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey:true,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    topic: {
        type: Sequelize.STRING,
        allowNull: false
    },
    teacher_id: {
        type: Sequelize.INTEGER,
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

});

module.exports = Courses;