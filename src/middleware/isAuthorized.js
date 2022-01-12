const UnauthorizedError = require("../errors/UnauthorizedError");

module.exports = (req, res, next) => {
    if (req.session.user) {
        return next();
    } else {
        return next(new UnauthorizedError("Unauthorized"));
    }
};
