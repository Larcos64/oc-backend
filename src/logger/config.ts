import pino from 'pino';

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
}) */

export const loggerConfig = {
    level: process.env.LOG_LEVEL || 'info',
    redact: ['email'],
    transport: {
        target: 'pino-pretty', // solo en desarrollo
        options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
        },
    },
    timestamp: pino.stdTimeFunctions.isoTime,
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
    }
};
