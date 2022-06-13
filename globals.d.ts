import { logger as consoleLogger } from "~/functions/utils/Logger";

declare global {
  var logger = consoleLogger;
}
