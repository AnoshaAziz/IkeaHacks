const winston = require('winston');
module.exports = function (ex, req, res, next) {

    winston.error(ex.message, ex);

}