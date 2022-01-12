const userService = require("../services/user");
const Response = require("../helpers/response");

class AccountController {
    async update(req, res, next) {
        try {
            const userData = req.body;
            const id = req.session.user.id;
            await userService.update(id, userData);
            res.json(new Response("Information edited"));
        }catch(err){
            next(err);
        }
    }

    async changePassword(req, res, next) {
        try {
            const passwords = req.body;
            const id = req.session.user.id;
            await userService.changePassword(id, passwords);
            res.json(new Response("Password changed"));
        }catch(err){
            next(err);
        }
    }
}

module.exports = new AccountController();