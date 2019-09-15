//VALIDATION
const Joi = require('@hapi/joi');

const registervalidation = data => {
    const schema = {
        fname: Joi.string()
            .min(2)
            .required(),
        lname: Joi.string()
            .min(2)
            .required(),
        nickname: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required(),
    };
    return Joi.validate(data, schema);
}

const loginvalidation = data => {
    const schema = {
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required(),
    };
    return Joi.validate(data, schema);
}

module.exports.registervalidation = registervalidation;
module.exports.loginvalidation = loginvalidation;