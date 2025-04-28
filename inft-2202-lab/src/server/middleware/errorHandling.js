import { logger } from '../utils/logger.js';

export const ErrorHandlingMiddleware = (error, request, response, next) => {
    const { method, originalUrl, body, params, query, headers } = request;
    const { message, stack, statusCode = 500, errors= [] } = error;
    const time = new Date().toISOString();
    
    const context = {
        time,
        method,
        url: originalUrl,
        error,
        request: {
            body,
            params,
            query,
            headers
        },
        response: {
            statusCode,
            body: response.locals.data
        },
        error: {
            message,
            statusCode,
            stack
        }
    };

    logger.info(`[${time}]  ERROR: ${statusCode}, ${method} ${originalUrl}`, context);

    const responseObject = {
        message,
        errors
    };

    if (process.env.NODE_EVN !== 'production') {
        responseObject.stack = stack;
    }

    response.status(statusCode).json(responseObject);
};
