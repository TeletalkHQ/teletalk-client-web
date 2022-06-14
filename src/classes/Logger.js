let _level;

class Logger {
  static levels = ["error", "warn", "info", "debug"];

  constructor(level) {
    if (!_level) {
      this.setLevel(level || "debug");
    }

    this.isBrowser = this.browserDetector();

    if (!this.isBrowser) {
      this.colors = {
        start: "\x1b[2m",
        warn: "\x1b[35m",
        info: "\x1b[33m",
        debug: "\x1b[36m",
        error: "\x1b[31m",
        end: "\x1b[0m",
      };
    } else {
      this.colors = {
        start: "%c",
        warn: "color : #ff00ff",
        info: "color : #ffff00",
        debug: "color : #00ffff",
        error: "color : #ff0000",
        end: "",
      };
    }
    this.messageFormat = "[%t] [%l] - [%m]";
  }

  browserDetector() {
    return (
      typeof process === "undefined" ||
      process.type === "renderer" ||
      process.browser === true ||
      process.__nwjs
    );
  }

  setLevel(level) {
    _level = level;
    if (this.isBrowser || this.browserDetector()) {
      localStorage?.setItem("logLevel", level);
    }
  }

  removeLevel() {
    this.setLevel(undefined);
  }

  /**
   * @param level {string}
   * @returns {boolean}
   */
  canSend(level) {
    return Logger.levels.indexOf(_level) >= Logger.levels.indexOf(level);
  }

  /**
   * @param message {string}
   */
  warn(message) {
    // todo remove later
    if (_level === "debug") {
      console.error(new Error().stack);
    }
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
  log(level, message, color) {
    console.log(level, message, color);
    if (!_level) {
      return;
    }
    if (this.canSend(level)) {
      if (this.isBrowser) {
        console.log(this.colors.start + this.format(message, level), color);
      } else {
        console.log(color + this.format(message, level) + this.colors.end);
      }
    }
  }
}

const logger = new Logger();

export { logger, Logger };
