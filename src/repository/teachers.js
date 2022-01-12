const teacher = require("../models/teacher");
const NotAcceptableError = require("../errors/NotAcceptableError");
const NotFound = require("../errors/NotFoundError");
const constants = require("../constants");
const bcrypt = require("bcrypt");


class teacherRepository {

    findteacherByEmail(email) {

        return teacher.findOne({ where: { email: email } });

    }

    findteacherById(id) {

        return teacher.findOne({ where: { id: id } });

    }

    async update(id, teacherData){

        return teacher.update(teacherData, {where: {id: id}});

    }

    async changePassword(id, passwords){

        const teacher = await teacher.findOne({where: {id: id}});
        const oldIsCorrect = teacher.validatePassword(passwords.oldPassword);
        let teacherData = new Object();

        if(oldIsCorrect){

            teacherData.password = bcrypt.hashSync(passwords.newPassword, bcrypt.genSaltSync(8));

        } else {

            throw new NotAcceptableError("Incorrect old password");

        }

        return teacher.update(teacherData, {where: {id: id}});

    }

    async create(teacherData) {

        let teacher = null;

        try{

            teacher = await teacher.create(teacherData);

        } catch(err){

            if(err.parent.errno == 1024){

                throw new NotAcceptableError("teacher already exists");

            }

            throw new Error("Failed to add new teacher");

        }

        return teacher;

    }

    async list(page) {

        let result = null;
        const teachersOnPage = constants.teachersOnPage;

        if(page){

            result = await teacher.findAll({offset: page * teachersOnPage - teachersOnPage, limit: teachersOnPage});

        } else {

            result = await teacher.findAll();

        }

        for (let obj of result) {

            let roles = [];
            let rolesObj = await obj.getRoles();

            rolesObj.forEach(element => {

                roles.push(element.dataValues.name);

            });

            obj.dataValues.roles = roles;

        }

        return result;

    }

    async search(criteria){

        if(!criteria){

            throw new NotAcceptableError("Wrong search parameters");

        }

        let result = await teacher.findOne({where: {[criteria.name]: criteria.value}});

        if(!result){

            throw new NotFound("teachers not found");

        }

        return result;

    }

    async delete(id) {

        return await teacher.destroy({ where: { id: id } });

    }
}

module.exports = new teacherRepository();
