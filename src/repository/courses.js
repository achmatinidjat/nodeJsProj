const course = require("../models/courses");
const sequelize = require("sequelize");
const constants = require("../constants");
const NotAcceptableError = require("../errors/NotAcceptableError");
const Op = sequelize.Op;

class courseRepository {

    async create(course) {

        return await course.create(course);

    }

    async read(id){

        const course = await course.findByPk(id);

        if(!course){

            throw new NotAcceptableError("course doesn't exists");

        }

        return course;

    }

    async readSome(id) {

        return await course.findAll({where: {id: id}});

    }

    async searchByName(name) {

        return await course.findAll({where: {name: {[Op.like]: `%${name}%`}}});

    }

    async update(id, courseData) {

        if(courseData.amount && courseData.amount == 0) {

            courseData.amount = null;

        }

        courseData.update_date = new Date();

        return await course.update(courseData, { where: { id: id } });

    }

    async delete(id) {

        if(!await course.findOne({ where: { id: id } })){

            throw new NotAcceptableError("course doesn't exists");

        }

        await course.destroy({ where: { id: id } });

    }

    async list(params) {

        const coursesOnPage = constants.coursesOnPage;
        let offset = null, limit = null;
        let where = {};
        let orderBy = [["id", "ASC"]]

        if (params.imgOnly) {

            where.image = { [Op.ne]: null };

        }

        if (params.orderBy) {

            orderBy = [[params.orderBy, "ASC"]];

        }

        if(params.page){

            let page = params.page;

            offset = page * coursesOnPage - coursesOnPage;

            limit =  coursesOnPage;

        }

        let result = await course.findAll({
            where,
            order: [
                sequelize.fn('isnull', sequelize.col('amount')),
                orderBy
            ],
            offset: offset,
            limit: limit
        });

        return result;
    }
}

module.exports = new courseRepository();
