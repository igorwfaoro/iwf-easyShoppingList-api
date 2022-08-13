import { ERROR_MESSAGES } from "../../static/error-messages";
import { CustomException } from "../exceptions/setup/custom.exception";

export function onError(error, req, res, next) {
    console.error(error);

    let message: string;
    let statusCode: number;
    let details: string;

    if (error instanceof CustomException) {
        message = error.message;
        statusCode = error.statusCode;
        details = error.details;

        // } else if (error.sql) {
        //     const sqlMessage = error.original.sqlMessage;

        //     message = `Algo errado 🙁 - [${sqlMessage || 'sql_error'}]`;
        //     statusCode = 400;
    } else {
        message = ERROR_MESSAGES.UNKNOWN_ERROR;
        statusCode = 400;
    }

    res.status(statusCode)
        .json({
            statusCode,
            message,
            details,
            stack: error.stack
        });
}