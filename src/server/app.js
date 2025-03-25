/*
Name: Alyssa Bhagwandin
Filename: apps.js
Course: INFT 2202
Created Date: March 5th, 2025
Description: this is the server side version of the app.js file.
*/

// import express from 'express';
import express, { response } from 'express';
import path from 'path';

// import defaultRouter from './routes/routes.js';
import animalsRouter from './routes/animals.js';
import mongoose from 'mongoose';
import logger from 'winston';
import { ErrorHandlingMiddleware } from './middleware/errorHandling.js';
import { loggerMiddleware } from './middleware/logging.js';
// import { logger } from 'winston';
import createHttpError from 'http-errors';

const {NotFound} = createHttpError;


console.log('testing');

// ! Originally I had express.Router() but it was giving me an error so I changed it to express()
const app = express();
const PORT = 3000;

// configure express to use json(middleware).
app.use(express.json());
app.use(loggerMiddleware);
// app.use('/', defaultRouter);
app.use('/api', animalsRouter);

// Tells the server to use the client folder as the static folder. The whole directory is being used.
// app.use(express.static(`${import.meta.dirname}/../client`));
// app.use(express.static(path.join(import.meta.dirname, '../../dist')));
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from the 'dist' directory
// app.use(express.static(path.join(__dirname, '../../dist')));
app.use(express.static(path.join(import.meta.dirname, '../../dist')));


//

app.use('/node_modules', express.static(`${import.meta.dirname}/../../node_modules`));

app.use('*', (req, res, next) => {
    // next(new NotFound('Page not found'));
    // res.sendFile(Path2D.resolve(import.meta.dirname + '/../dist/index.html'))
    // res.sendFile(path.resolve(import.meta.dirname + 'dist', 'index.html'));
        res.sendFile(path.resolve(`${import.meta.dirname}/../../dist/index.html`));
        // res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
});

app.use(ErrorHandlingMiddleware);

// app.use((err, req, res, next) => {
//     console.log(err);
//     res.status(500).json({
//         message: 'Something went wrong',
//     });
// }); 

// trying to connect to the database with mongoose.
await mongoose.connect('mongodb://127.0.0.1:27017/inft2202');
logger.info('Yay we have connected to the database successfully!');

app.listen(PORT, () => {
    logger.info(`server is running on port ${PORT}`);
});


