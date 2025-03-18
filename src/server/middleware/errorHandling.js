import { logger } from '../utils/logger.js';

export const ErrorHandlingMiddleware = (error, request, response, next) => {
    const { method, originalUrl, body, params, query, headers } = request;
    const { message, stack, statusCode = 500 } = error;
    const time = new Date().toISOString();
    
    const context = {
        time,
        method,
        originalUrl,
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
        message
    };

    response.status(statusCode).json(responseObject);
};
