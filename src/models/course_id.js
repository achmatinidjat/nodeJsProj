const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");
const bcrypt = require("bcrypt");

const CourseId = sequelize.define("course_id",{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey:true,
        allowNull: false
    },
    course_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
});
module.exports = CourseId;