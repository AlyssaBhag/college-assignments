/*
Name: Alyssa Bhagwandin
Filename: app.js
Course: INFT 2202
Created Date: March 12th, 2025
Description: This is the server-side version of the app.js file for my lab assignment.
*/

import express, { response } from 'express';
import productsRouter from './routes/products.js';
import mongoose from 'mongoose';
import logger from 'winston';
import { ErrorHandlingMiddleware } from './middleware/errorHandling.js';
import { loggerMiddleware } from './middleware/logging.js';

import createHttpError from 'http-errors';
const {NotFound} = createHttpError;


console.log('testing');

const app = express();
const PORT = 3000;

// configure express to use json(middleware).
app.use(express.json());
app.use(loggerMiddleware);

app.use('/api', productsRouter);

// Tells the server to use the client folder as the static folder. The whole directory is being used.
app.use(express.static(`${import.meta.dirname}/../client`));
app.use('/node_modules', express.static(`${import.meta.dirname}/../../node_modules`));

app.use('*', (req, res, next) => {
    next(new NotFound('Page not found'));
});

app.use(ErrorHandlingMiddleware);

// trying to connect to the database with mongoose.
await mongoose.connect('mongodb://127.0.0.1:27017/inft2202');
logger.info('Yay we have connected to the database successfully!');

app.listen(PORT, () => {
    logger.info(`server is running on port ${PORT}`);
});


