const Joi = require("joi");

const NotAcceptableError = require("../errors/NotAcceptableError");

module.exports = schema => {
    return (req, res, next) => {
        const isNotValid = Joi.validate(req.body, schema).error;

        if (isNotValid) {
            next(new NotAcceptableError(isNotValid.message));
        }

        next();
    };
};
