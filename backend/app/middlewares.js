// Module Import
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');


// Built in Middleware
const middleware = [
    morgan('dev'),
    cors(),
    express.json(),
    express.urlencoded({extended: true})
]

// Module Export
module.exports = middleware;