import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize({ all: true }),
    winston.format.align(),
    winston.format.printf((info) => {
      const { timestamp, level, message, ...args } = info;

      // const ts = timestamp.slice(0, 19).replace('T', ' ');
      return `${timestamp} ${level}: ${message} ${
        Object.keys(args).length ? JSON.stringify(args, null, 2) : ""
      }`;
    }),
    winston.format.colorize({ all: true })
  ),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

export default logger;
