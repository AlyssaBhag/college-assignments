/*
Name: Alyssa Bhagwandin
Filename: routes.js
Course: INFT 2202
Created Date: March 5th, 2025
Description: This is my routes file.
*/

// import and export the express module.
import express from 'express';
const router = express.Router()
export default router;

// create the routes for the index, contact, search, create, and about pages.
router.get('/', (req, res, next) => {
    res.send('This is  the index page!');
});

router.get('/contact', (req, res, next) => {
    res.send('This is  the contact page!');
});

router.get('/search', (req, res, next) => {
    res.send('This is the look for animals page!');
});

router.get('/create', (req, res, next) => {
    res.send('This is the create animals page!');
});

router.get('/about', (req, res, next) => {
    res.send('This is  the about page!');
});
