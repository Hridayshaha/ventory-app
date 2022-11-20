// Module Import
const express = require('express');
const {error404, globalErrorHandler}  = require('./errorHandler')
require('dotenv').config();


// Initialization App
const app = express();

// Middlewares
app.use(require('./middlewares'))

// Routes
app.use(require('./route'));

// Error Handlers
app.use(error404);
app.use(globalErrorHandler);

// Module Export 
module.exports = app;