import { BrowserLogger } from "utility-store/src/classes/BrowserLogger";

declare global {
  var logger = new BrowserLogger();
}
