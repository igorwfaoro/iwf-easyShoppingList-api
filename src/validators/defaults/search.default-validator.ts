import Joi = require("joi");

export const searchDefaultValidator = {
    q: Joi.string()
};