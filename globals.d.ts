import { LoggerBrowser } from "utility-store/src/classes/LoggerBrowser";

declare global {
  var logger = new LoggerBrowser();
}
