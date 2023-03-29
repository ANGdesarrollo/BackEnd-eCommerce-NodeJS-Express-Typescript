import winston from 'winston';
import dayjs from 'dayjs';
import { blue, green, yellow, red } from 'colorette';

interface LogObject {
  message: string;
  timestamp: string;
  level: string;
}

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp({
          format: () => blue(dayjs().format('YYYY-MM-DD HH:mm:ss')),
        }),
        winston.format.colorize(),
        winston.format.printf((info) => {
          const { message, timestamp, level } = info as LogObject;
          return `${timestamp} [${green(level.toUpperCase())}]: ${message}`;
        }),
      ),
    }),
    new winston.transports.File({
      level: 'warn',
      filename: './src/logs/warn.log',
      format: winston.format.combine(
        winston.format.timestamp({
          format: () => blue(dayjs().format('YYYY-MM-DD HH:mm:ss')),
        }),
        winston.format.printf((info) => {
          const { message, timestamp, level } = info as LogObject;
          return `[${timestamp}] [${yellow(level)}]: ${message}`;
        }),
      ),
    }),
    new winston.transports.File({
      level: 'error',
      filename: './src/logs/error.log',
      format: winston.format.combine(
        winston.format.timestamp({
          format: () => blue(dayjs().format('YYYY-MM-DD HH:mm:ss')),
        }),
        winston.format.printf((info) => {
          const { message, timestamp, level } = info as LogObject;
          return `${timestamp} [${red(level)}]: ${message}`;
        }),
      ),
    }),
  ],
});