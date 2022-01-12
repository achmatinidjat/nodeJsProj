const Joi = require("joi");

const UserScheme = {
    create: Joi.object().keys({
        email: Joi.string()
            .email()
            .max(50)
            .required(),
        password: Joi.string()
            .min(4)
            .max(20)
            .required(),
        first_name: Joi.string()
            .max(50)
            .required(),
        last_name: Joi.string()
            .max(50)
            .required()
    }),

    login: Joi.object().keys({
        email: Joi.string()
            .email()
            .min(1)
            .required(),
        password: Joi.string()
            .min(4)
            .max(20)
            .required()
    }),

    update: Joi.object().keys({
        first_name: Joi.string().max(50),
        last_name: Joi.string().max(50)
    }),

    changePassword: Joi.object().keys({
        oldPassword: Joi.string()
            .min(4)
            .max(20)
            .required(),
        newPassword: Joi.string()
            .min(4)
            .max(20)
            .required()
    })
}

module.exports = UserScheme;
