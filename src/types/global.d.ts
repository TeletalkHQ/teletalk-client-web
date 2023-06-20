import { LoggerBrowser } from "logger-browser";

import { Environments } from "~/types";

declare global {
  var logger = new LoggerBrowser();
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ProcessEnv extends Environments { }
  }
}