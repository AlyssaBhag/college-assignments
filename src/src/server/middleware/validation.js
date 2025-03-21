import { validationResult } from "express-validator";

import createHttpError from "http-errors";
const {badRequest} = createHttpError;


export function CheckValidation(rules) {
    return [rules, doValidation];
}

function doValidation(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return next();
    }

    const errObj = new badRequest('input validation failed');
    errObj.error = result.array();
    
    // const errObj = {
    //     error: result.array(),
    //     message: 'input validation failed'
    // };
    
    return next(errObj);
}


