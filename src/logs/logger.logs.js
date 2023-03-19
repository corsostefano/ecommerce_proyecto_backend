import winston from 'winston';

export const logger = winston.createLogger({
    level: 'error',
    transports: [
        new winston.transports.Console({ level: 'info' }),
        new winston.transports.File({ filename: './src/logs/warn.log', level: 'warn' }),
        new winston.transports.File({ filename: './src/logs/error.log', level: 'error' })
    ]
})