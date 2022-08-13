import { Response } from "express";

export interface TokenPayload {
    userId: number;
}
export class TokenHelper {

    public static getPayload(res: Response): TokenPayload {
        const payload = res.locals.jwtPayload;
        return payload;
    }

    public static getUserId(res: Response): number {
        return TokenHelper.getPayload(res).userId;
    }
}