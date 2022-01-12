const requestForDeleteService = require("../services/deleteRequest");
const Response = require("../helpers/response");

class requestForDeleteController {
    async create(req, res, next) {

        try {

            await requestForDeleteService.create(req.session.user.id);

            res.json(new Response("Request created"));

        } catch (err) {

            return next(err);

        }
    }
}

module.exports = new requestForDeleteController();
