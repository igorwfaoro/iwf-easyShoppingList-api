import { NextFunction, Response, Request } from "express";
import { NotAuthorizedException } from "../common/exceptions/not-authorized.exception";
import { ApiKey } from "../models/entities/api-key";

export function checkApiKey(req: Request, res: Response, next: NextFunction) {

    if (!req.query.apiKey)
        next(new NotAuthorizedException());

    if (ApiKey.getDb().exists(x => x.key == req.query.apiKey))
        next();
    else
        next(new NotAuthorizedException());
};