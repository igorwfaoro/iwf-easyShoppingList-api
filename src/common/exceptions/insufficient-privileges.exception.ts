import { ERROR_MESSAGES } from "../../static/error-messages";
import { CustomException } from "./setup/custom.exception";

export class InsufficientPrivilegesException extends CustomException {

    constructor(message = ERROR_MESSAGES.INSUFFICIENT_PRIVILEGES_ERROR, statusCode = 403) {
        super(statusCode, message);
    }
}