import { validationResult } from "express-validator";
import createHttpError from "http-errors";

const {BadRequest} = createHttpError;

export function CheckValidation(rules) {
    return [rules, doValidation];
}

function doValidation(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        const errObj = new BadRequest('Input validation failed');
        errObj.errors = result.array();
        return next(errObj);
    }
    next();
}


