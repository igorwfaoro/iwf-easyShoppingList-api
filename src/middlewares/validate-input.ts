import { Request, Response, NextFunction } from "express";
import * as Joi from 'joi';
import { InputValidationException } from "../common/exceptions/input-validation.exception";

export function validateInput(schema: Joi.ObjectSchema) {
    return function validate(req: Request, res: Response, next: NextFunction) {

        const { error } = schema.validate(req, {
            abortEarly: false,
            stripUnknown: true
        });

        if (error) {
            next(new InputValidationException(error.message));
        } else {
            next();
        }

    };
};