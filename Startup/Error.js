const winston = require("winston");

module.exports = function () {

    winston.add(
        new winston.transports.File({ filename: "logfile.log", level: "error" })
    );
    winston.add(
        new winston.transports.File({ filename: "logfile.log", level: "info" })
    );

    // winston.handleExeptions(new winston.transports.File({ filename: "Exceptions.js" }));

    process.on('uncaughtException', (ex) => {

        winston.error(ex.message, ex);
    })

    process.on("unhandledRejection", (ex) => {

        throw ex;
    })
}

