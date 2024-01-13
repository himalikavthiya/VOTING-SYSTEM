import log4js from "log4js";

// create logger instance
export const logger = log4js.getLogger();

// configure log4js with the given options
log4js.configure({
  appenders: {
    app: {
      // set the type of appender
      type: "file",
      // set the name of the log file
      filename: "response.log",
    },
  },
  categories: {
    default: {
      // set the appenders for the logger
      appenders: ["app"],
      // set the log level
      level: "error",
    },
  },
});
