const express = require('express');
const mongoose = require('mongoose');
const router = require('./Routes/HackRoute')
const expressObject = new express();
const winston = require('winston');

const hackModel = require('./Model/HackModel');
const routes = require('./Startup/Routes')(expressObject);
const error = require('./Startup/Error')();
const db = require('./Startup/Db')();



const port = process.env.PORT || 2000;
expressObject.listen(port, () => {
    winston.info(`Connecting to port ${port} `);
});