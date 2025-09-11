const winston = require("winston");
const expressWinston = require("express-winston");

require("winston-mongodb")

module.exports =  expressWinston.errorLogger({
    transports: [
        new winston.transports.File({filename: "./log/error_test.log", level: "error"}),
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
})