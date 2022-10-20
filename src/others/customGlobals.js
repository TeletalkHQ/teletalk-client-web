const { LoggerBrowser } = require("utility-store/src/classes/LoggerBrowser");

const logger = new LoggerBrowser();

global.logger = logger;
