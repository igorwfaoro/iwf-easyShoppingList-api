import { NextFunction, Response, Request } from "express";
import * as jwt from "jsonwebtoken";
import { AuthException } from "../common/exceptions/auth.exception";
import { ENV_CONFIG } from "../env-config";

export function checkToken(req: Request, res: Response, next: NextFunction) {

    const token = <string>req.headers["authorization"];
    let jwtPayload;

    try {
        jwtPayload = <any>jwt.verify(token.split(' ')[1], ENV_CONFIG.JWT_SECRET);
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        next(new AuthException());
    }

    next();
};