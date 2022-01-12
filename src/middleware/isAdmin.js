const ForbiddenError = require("../errors/ForbiddenError");
const constants = require("../constants");

module.exports = (req, res, next) => {

    if (req.session.role == constants.adminRoleNum) {

        next();

    } else {

        next(new ForbiddenError("Not enough rights"));

    }
};
