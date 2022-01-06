const express = require('express');
const router = require('../Routes/HackRoute');
const error = require('../MiddleWare/Error');
const users = require('../Routes/UserRoute');
const authenticate = require('../Routes/Authentcation');

module.exports = function (expressObject) {

    expressObject.use(express.json());
    expressObject.use('/hacks', router);
    expressObject.use('/users', users);
    expressObject.use('/authentication', authenticate);
    expressObject.use(error);
}
