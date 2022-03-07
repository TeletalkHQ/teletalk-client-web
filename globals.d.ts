import { logger as consoleLogger } from "~/Functions/Utils/Logger";

declare global {
  var logger = consoleLogger;
}
