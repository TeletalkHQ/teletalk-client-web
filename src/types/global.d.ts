import { LoggerBrowser } from "logger-browser";

import { appConfigs as appConfigsInstance } from "~/classes/AppConfigs";
import { envManager as envManagerInstance } from "~/classes/EnvironmentManager";
import { socketEmitterStore as socketEmitterStoreInstance } from "~/classes/websocket/EventManager";
import { websocket as websocketInstance } from "~/classes/websocket/Websocket";

import { Environments, StringMap } from "~/types";

declare global {
  var logger = new LoggerBrowser();
  var updater = () => {};
  var ping = (_data: StringMap) => {};
  var appConfigs = appConfigsInstance;
  var envManager = envManagerInstance;
  var socketEmitterStore = socketEmitterStoreInstance;
  var websocket = websocketInstance;

  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ProcessEnv extends Environments {}
  }
}
