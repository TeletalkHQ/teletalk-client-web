import io from "socket.io-client";
import { LoggerBrowser } from "utility-store/src/classes/LoggerBrowser";

declare global {
  var logger = new LoggerBrowser();
  var ioSocket = io();
}
