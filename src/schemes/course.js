const Joi = require("joi");

const ProductScheme = {
    create: Joi.object().keys(
        {
            title: Joi.string()
                .alphanum()
                .min(3)
                .max(50)
                .required(),

            topic: Joi.string()
                .alphanum()
                .min(3)
                .max(50)
                .required(),


        }
    ),

    update: Joi.object().keys(
        {
            title: Joi.string()
                .alphanum()
                .min(3)
                .max(50)
                .required(),

            topic: Joi.string()
                .alphanum()
                .min(3)
                .max(50)
                .required(),

        }
    )
}

module.exports = ProductScheme;
