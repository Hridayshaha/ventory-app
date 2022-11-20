// Module Import
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser')

// Built in Middleware
const middleware = [
    morgan('dev'),
    cookieParser(),
    cors(),
    express.json(),
    express.urlencoded({extended: true})
]

// Module Export
module.exports = middleware;