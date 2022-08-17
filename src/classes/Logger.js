class Logger {
  constructor() {
    if (this.browserDetector()) {
      this.colors = {
        debug: "color : #00ffff",
        end: "",
        error: "color : #ff0000",
        info: "color : #ff00ff",
        start: "%c",
        warn: "color : #ffff00",
      };
    } else {
      this.colors = {
        debug: "\x1b[36m",
        end: "\x1b[0m",
        error: "\x1b[31m",
        info: "\x1b[33m",
        start: "\x1b[2m",
        warn: "\x1b[35m",
      };
    }
    this.messageFormat = "[%t] [%l] - [%m]";
    this.levels = {
      error: "error",
      warn: "warn",
      info: "info",
      debug: "debug",
    };
  }

  #level = undefined;
  #levels = ["error", "warn", "info", "debug"];

  browserDetector() {
    return (
      typeof process === "undefined" ||
      process.type === "renderer" ||
      process.browser === true ||
      process.__nwjs
    );
  }

  setLevel(level) {
    this.#level = level;
  }

  removeLevel() {
    this.setLevel();
  }

  /**
   * @param level {string}
   * @returns {boolean}
   */
  canSend(level) {
    return this.#levels.indexOf(this.#level) >= this.#levels.indexOf(level);
  }

  /**
   * @param message {string}
   */
  warn(message) {
    this.log(this.levels.warn, message, this.colors.warn);
    this.log(this.levels.warn, new Error().stack, this.colors.warn);
  }

  /**
   * @param message {string}
   */
  info(message) {
    this.log(this.levels.info, message, this.colors.info);
  }

  /**
   * @param message {string}
   */
  debug(message) {
    this.log(this.levels.debug, message, this.colors.debug);
  }

  /**
   * @param message {string}
   */
  error(message) {
    this.log(this.levels.error, message, this.colors.error);
    this.log(this.levels.error, new Error().stack, this.colors.error);
  }

  format(message, level) {
    const LEVEL = level.toUpperCase();
    const stringMessage = this.stringifyMessage(message);
    const date = new Date().toISOString();

    return this.messageFormat
      .replace("%t", date)
      .replace("%l", LEVEL)
      .replace("%m", stringMessage);
  }
  stringifyMessage(message) {
    return typeof message === "string" ? message : JSON.stringify(message);
  }

  /**
   * @param level {string}
   * @param message {string}
   * @param color {string}
   */
  log(level, message, color = this.colors.debug) {
    if (!this.#level || !message || !level) {
      return;
    }
    if (this.canSend(level)) {
      if (this.browserDetector()) {
        console.log(this.colors.start + this.format(message, level), color);
      } else {
        console.log(color + this.format(message, level) + this.colors.end);
      }
    }
  }
}

const logger = new Logger();

export { logger, Logger };
