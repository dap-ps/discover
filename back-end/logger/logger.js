const winston = require('winston');
const CloudWatchTransport = require('winston-aws-cloudwatch');

let baseConfig = {
    logGroupName: `${process.env.ENVIRONMENT}-logs`,
    createLogGroup: true,
    createLogStream: true,
    awsConfig: {
        accessKeyId: process.env.CLOUDWATCH_ACCESS_KEY_ID,
        secretAccessKey: process.env.CLOUDWATCH_SECRET_ACCESS_KEY,
        region: process.env.CLOUDWATCH_REGION
    }
}

let cloudWatchLogConfig = Object.assign({ logStreamName: `application-logs` }, baseConfig);

let loggerLevels = {
    levels: {
        error: 1,
        warn: 2,
        info: 3
    }
}

module.exports = {
    getLoggerFor: function (context) {
        const transports = [new winston.transports.File({ filename: 'logs.log' })];
        let logger = winston.createLogger({
            levels: loggerLevels.levels,
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                winston.format.printf(log => {
                    return `[${log.timestamp}]-[${log.level.toUpperCase()}]-[${context}]: ${log.message}`;
                })
            ),
            transports: transports
        });

        if (process.env.ENVIRONMENT == 'DEV') {
            logger.add(new winston.transports.Console());
        } else {
            // Set the Formatting per Logger, because we need to context
            cloudWatchLogConfig.formatLog = function (log) {
                return `[${log.level.toUpperCase()}]-[${context}]: ${log.message}`;
            }
            logger.add(new CloudWatchTransport(cloudWatchLogConfig));
        }

        return logger;
    },
};