/*
Name: Alyssa Bhagwandin
Filename: apps.js
Course: INFT 2202
Created Date: March 5th, 2025
Description: this is the server side version of the app.js file.
*/

import express from 'express';
import defaultRouter from './routes/routes.js';
import animalsRouter from './routes/animals.js';

console.log('testing');

// ! Originally I had express.Router() but it was giving me an error so I changed it to express()
const app = express();
const PORT = 3000;

app.use('/', defaultRouter);
app.use('/api', animalsRouter);


app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        message: 'Something went wrong',
    });
}); 

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});

