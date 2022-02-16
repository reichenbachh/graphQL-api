import appRootPath from "app-root-path";
import winston from "winston";

const options = {
  file: {
    level: "info",
    filename: `${appRootPath}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const logLevel = () => {
  const nodeEnv = process.env.NODE_ENV || "development";
  const isInDevelopment = nodeEnv === "development";
  return isInDevelopment ? "debug" : "warn";
};

const format: winston.Logform.Format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

const levels: winston.config.AbstractConfigSetLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

const transports: winston.transport | winston.transport[] | undefined = [
  new winston.transports.Console(options.console),
  new winston.transports.File(options.file),
];

winston.addColors(colors);

const logger: winston.LoggerOptions = winston.createLogger({
  level: logLevel(),
  levels,
  format,
  transports,
});

export default logger;
