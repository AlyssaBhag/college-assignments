

import { logger } from "../utils/logger.js";
// import { res } from "express";
// import { res } from "express-validator";

export const loggerMiddleware = (req, res, next) => {
    logRequest(req, res);
    res.once('finish', () => {
        logRequest(req, res);
    });
    next(); 
}

const logRequest = (req, res) => {
    const time = new Date().toISOString();
    const{ method, originalUrl, body, params, query, headers }  = req;
    const {statusCode} = res;


    const original = res.json;
    res.json = async(value) => {
        const data = await Promise.resolve(value);
        res.locals.data = data;
        return original.call(res, data);
    }


    const context = {
        time,
        method,
        originalUrl,
        req: {
            body,
            params,
            query,
            headers
        },
        res: {
            statusCode,
            body: res.locals.data
        }
    }
    //add res time
    if (res.HeadersSent){
        logger.info(`[${time}]  res: ${method} ${originalUrl}`, context);
    }else {
        logger.info(`[${time}]  req: ${method} ${originalUrl}`, context);
    }
}