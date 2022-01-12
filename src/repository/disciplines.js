const discipline = require("../models/discipline");
const sequelize = require("sequelize");
const constants = require("../constants");
const NotAcceptableError = require("../errors/NotAcceptableError");
const Op = sequelize.Op;

class disciplineRepository {

    async create(discipline) {

        return await discipline.create(discipline);

    }

    async read(id){

        const discipline = await discipline.findByPk(id);

        if(!discipline){

            throw new NotAcceptableError("discipline doesn't exists");

        }

        return discipline;

    }

    async readSome(id) {

        return await discipline.findAll({where: {id: id}});

    }

    async searchByName(name) {

        return await discipline.findAll({where: {name: {[Op.like]: `%${name}%`}}});

    }

    async update(id, disciplineData) {

        if(disciplineData.amount && disciplineData.amount == 0) {

            disciplineData.amount = null;

        }

        disciplineData.update_date = new Date();

        return await discipline.update(disciplineData, { where: { id: id } });

    }

    async delete(id) {

        if(!await discipline.findOne({ where: { id: id } })){

            throw new NotAcceptableError("discipline doesn't exists");

        }

        await discipline.destroy({ where: { id: id } });

    }

    async list(params) {

        const disciplinesOnPage = constants.disciplinesOnPage;
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

            offset = page * disciplinesOnPage - disciplinesOnPage;

            limit =  disciplinesOnPage;

        }

        let result = await discipline.findAll({
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

module.exports = new disciplineRepository();
