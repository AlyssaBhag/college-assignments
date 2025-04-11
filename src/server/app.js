/*
Name: Alyssa Bhagwandin
Filename: app.js
Course: INFT 2202
Created Date: March 12th, 2025
Description: This is the server-side version of the app.js file for my lab assignment.
*/

import express from 'express';
import productsRouter from './routes/products.js';
import mongoose from 'mongoose';
import logger from 'winston';
import { ErrorHandlingMiddleware } from './middleware/errorHandling.js';
import { loggerMiddleware } from './middleware/logging.js';
import createHttpError from 'http-errors';
import path from 'path';
import { fileURLToPath } from 'url';

const { NotFound } = createHttpError;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(loggerMiddleware);

// Use the products router
app.use('/api/products', productsRouter);

// Serve static files
app.use(express.static(path.join(__dirname, '../../dist')));

// Handle SPA routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

// Handle 404 errors
app.use('*', (req, res, next) => {
    next(new NotFound('Page not found'));
});

// Error handling middleware
app.use(ErrorHandlingMiddleware);

// Connect to MongoDB
await mongoose.connect('mongodb://127.0.0.1:27017/inft2202');
logger.info('Connected to the database successfully!');

// Start the server
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});

export default app;


