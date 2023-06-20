//@ts-nocheck
import { appConfigs } from "~/classes/AppConfigs";
import { envManager } from "~/classes/EnvironmentManager";
import { socketEmitterStore } from "~/classes/websocket/SocketEmitterStore";
import { websocket } from "~/classes/websocket/Websocket";

export const registerWindowCustomProperties = () => {
  window.appConfigs = appConfigs;
  window.envManager = envManager;
  window.socketEmitterStore = socketEmitterStore;
  window.websocket = websocket;
};
