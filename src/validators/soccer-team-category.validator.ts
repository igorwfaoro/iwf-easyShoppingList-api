import * as Joi from 'joi';
import { langDefaultValidator } from './defaults/lang.default-validator';

export const soccerTeamCategoryValidator = {
    getAll: Joi.object({
        query: Joi.object({
            ...langDefaultValidator
        }).required()
    })
};