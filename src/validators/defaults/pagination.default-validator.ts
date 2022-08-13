import Joi = require("joi");

export const paginationDefaultValidator = {
    index: Joi.number().min(0),
    limit: Joi.number().min(1)
};