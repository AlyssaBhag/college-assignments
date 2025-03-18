import { validationResult } from "express-validator";

function doValidation(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return next();
    }
    const errObj = {
        error: result.array(),
        message: 'input validation failed'
    };
    return next(errObj);
}


export function CheckValidation(rules) {
    return [rules, doValidation];
}