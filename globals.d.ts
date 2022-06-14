import { logger as consoleLogger } from "~/classes/Logger";

declare global {
  var logger = consoleLogger;
}
