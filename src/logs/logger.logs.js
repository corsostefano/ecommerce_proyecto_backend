import {createLogger, transports, format} from 'winston'

export const logger = createLogger({
    level: 'error',
    transports: [
        new transports.Console({ 
            level: 'info', 
            format: format.combine(format.colorize(), format.simple()),
        }),
        new transports.File({ 
            level: 'warn', 
            filename: './src/logs/warn.log', 
            format: format.combine(
                format.label({label: "Esto es un warn"}),
                format.timestamp(),
                format.prettyPrint(),
            )
        }),
        new transports.File({ 
            level: 'error', 
            filename: './src/logs/error.log', 
            format: format.combine(
                format.label({label: "Esto es un Error"}),
                format.timestamp(),
                format.prettyPrint(),
            )
        })
    ]
})