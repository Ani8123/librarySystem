const winston = require('winston');

function logger(){
    const logConfiguration = {
        transports: [
            new winston.transports.Console()
        ],
        format: winston.format.combine(
            winston.format.timestamp({
            format: 'MMM-DD-YYYY HH:mm:ss'
        }),
            winston.format.printf(info => `<${[info.timestamp]}> : [${info.level}]: ${info.message}`),
        )
    };

    return winston.createLogger(logConfiguration);
}

module.exports = logger();