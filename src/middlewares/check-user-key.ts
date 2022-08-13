import { NextFunction, Response, Request } from "express";
import { UserKeyException } from "../common/exceptions/user-key.exception";
import { ServicesCollection } from "../providers";
import { UserService } from "../services/user.service";
import { ERROR_MESSAGES } from "../static/error-messages";

export async function checkUserKey(req: Request, res: Response, next: NextFunction) {

    // const userService = ServicesCollection.resolve(UserService);

    // const key = req.headers['user-key'] as string;

    // if (!key)
    //     next(new UserKeyException(ERROR_MESSAGES.USER_KEY_NOT_PRESENT));

    // try {
    //     await userService.verifyAccount(key);
    // } catch (error) {
    //     next(error);
    // }

    next();
};