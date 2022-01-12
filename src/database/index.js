const sequelize = require("./sequelize");
const  constants = require("../constants");

require("../models");

const userService = require("../services/user");

class DataBase{
    async connect(){
        await sequelize.sync();
        console.log("Connected to db!!");

        let admin = await userService.findUserByEmail("admin@admin.com");

        if(!admin){
            admin = await  userService.addUser({
                Login: "admin",
                password: "password",
                email: "admin@admin.admin",
                role: "admin"
            });
            userService.setRole(admin.id, constants.adminRoleNum);
        }
    }
}

module.exports = new DataBase();