const { BrowserLogger } = require("utility-store/src/classes/BrowserLogger");

const logger = new BrowserLogger();

global.logger = logger;
