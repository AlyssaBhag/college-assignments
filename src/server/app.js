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
import mongoose from 'mongoose';

console.log('testing');

// ! Originally I had express.Router() but it was giving me an error so I changed it to express()
const app = express();
const PORT = 3000;

// configure express to use json(middleware).
app.use(express.json());

// app.use('/', defaultRouter);
app.use('/api', animalsRouter);

// Tells the server to use the client folder as the static folder. The whole directory is being used.
app.use(express.static(`${import.meta.dirname}/../client`));
app.use('/node_modules', express.static(`${import.meta.dirname}/../../node_modules`));

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        message: 'Something went wrong',
    });
}); 

// trying to connect to the database with mongoose.
await mongoose.connect('mongodb://127.0.0.1:27017/inft2202');
console.log('Yay we have connected to the database successfully!');

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});

// ! Add this later. It will beep at you once your server chases as a audio queue.
process.on('uncaughtException', (err) => {
    console.error('An uncaught error has occurred: ', err)
})

