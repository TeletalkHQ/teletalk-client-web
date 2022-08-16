class Logger {
  constructor(level) {
    if (!this.#level) {
      this.setLevel(level || "debug");
    }

    if (this.browserDetector()) {
      this.colors = {
        debug: "\x1b[36m",
        end: "\x1b[0m",
        error: "\x1b[31m",
        info: "\x1b[33m",
        start: "\x1b[2m",
        warn: "\x1b[35m",
      };
    } else {
      this.colors = {
        debug: "color : #00ffff",
        end: "",
        error: "color : #ff0000",
        info: "color : #ffff00",
        start: "%c",
        warn: "color : #ff00ff",
      };
    }
    this.messageFormat = "[%t] [%l] - [%m]";
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
    this.log("warn", message, this.colors.warn);
  }

  /**
   * @param message {string}
   */
  info(message) {
    this.log("info", message, this.colors.info);
  }

  /**
   * @param message {string}
   */
  debug(message) {
    this.log("debug", message, this.colors.debug);
  }

  /**
   * @param message {string}
   */
  error(message) {
    this.log("error", message, this.colors.error);
  }

  format(message, level) {
    return this.messageFormat
      .replace("%t", new Date().toISOString())
      .replace("%l", level.toUpperCase())
      .replace("%m", message);
  }

  /**
   * @param level {string}
   * @param message {string}
   * @param color {string}
   */
  log(level, message, color = this.colors.debug) {
    if (!this.#level || message || level) {
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
