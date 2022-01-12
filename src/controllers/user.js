const userService = require("../services/user");
const Response = require("../helpers/response");
const constants = require("../constants");
const mailer = require("../mailer");


class UserController {
    async delete(req, res, next) {

        try {

            const userId = req.params.id;
            let email = null;

            const user = await userService.findUserById(userId);

            email = user.email;


            if (req.session.user.id == userId) {
                throw new Error();
            }
            await userService.delete(userId);

            mailer(email, "Account deleted", "Your account has been deleted");

            res.json(new Response("Delete successful", 200));

        } catch (err) {
            console.log(err);
            return next(err);
        }
    }

    async list(req, res, next) {

        try {

            let page = null;

            if(req.query.page) {
                page = req.query.page;
            }

            res.json(await userService.list(page));

        } catch (err) {
            console.log(err);
            return next(err);
        }
    }

    async search(req, res, next){

        try{
            const criteria = {};
            if(req.query.firstName){

                criteria.name = "first_name";
                criteria.value = req.query.firstName;

            }else if(req.query.lastName){

                criteria.name = "last_name";
                criteria.value = req.query.lastName;

            }else if(req.query.email){

                criteria.name = "email";
                criteria.value = req.query.email;

            }

            res.json(await userService.search(criteria));

        }catch(err){
            next(err);
        }

    }

    async setRole(req, res, next) {

        try {

            const userId = req.params.id;
            let roleId = constants.userRoleNum;

            if (req.query.value === constants.adminRoleText) {

                roleId = constants.adminRoleNum;

            }
            else if(req.query.value === constants.userRoleText){

                roleId = constants.userRoleNum;

            }

            await userService.setRole(userId, roleId);

            res.json(new Response("Role set successful", 200));

        } catch (err) {
            console.log(err);
            return next(err);
        }
    }
}

module.exports = new UserController();
