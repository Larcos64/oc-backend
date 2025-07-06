import pino from 'pino';

import { loggerConfig } from './config';

const logger = pino(loggerConfig);

/* const transport = pino.transport({
    targets: [
        {
            target: "pino/file",
            options: { destination: "./logs/output.log", mkdir: true, colorize: false }
        },
        {
            target: 'pino-pretty', // solo en desarrollo
            options: {
                colorize: true,
                translateTime: 'SYS:standard',
                ignore: 'pid,hostname',
            }
        }
    ]
})

const logger = pino({
    level: process.env.PINO_LOG_LEVEL || 'info',
    redact: ['email'],
    formatters: {
        bindings: (bindings) => {
            return {
                pid: bindings.pid,
                host: bindings.hostname,
                node_version: process.version
            };
        },
        level: (label) => {
            return { level: label.toUpperCase() }
        }
    },
    timestamp: pino.stdTimeFunctions.isoTime
}); */

export default logger;