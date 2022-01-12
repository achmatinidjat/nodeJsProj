const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");
const bcrypt = require("bcrypt");

const User = sequelize.define("user",{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey:true,
        allowNull: false
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    role: {
        type: Sequelize.STRING,
        allowNull:false,

    }
});
    User.beforeCreate((user, opts) => {
        user.password = User.hashPassword(user.password);
    });

    User.hashPassword = password => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    };

    User.prototype.validatePassword = function(password) {
        if (!password || !this.password) {
            return false;
        }
        return bcrypt.compareSync(password, this.password);
    };
    module.exports = User;















