import { envManager } from "classes/EnvironmentManager";

import {
  APP_DRAWER_ANCHORS,
  VIEW_MODES,
} from "variables/otherVariables/constants";

class AppConfigs {
  constructor() {
    this.configs = this.getDefaultConfigs();

    this.runConfigs();
  }
  #RUNTIME_MODE = envManager.getEnvironment(
    envManager.ENVIRONMENT_KEYS.REACT_APP_RUNTIME_MODE
  );
  #CLIENT_BASE_URLS = {
    development: "http://localhost:3000",
    production: "https://teletalk-client-web.vercel.app",
  };
  #SERVER_BASE_URLS = {
    development: "http://localhost:8080",
    production: "https://teletalk-server.herokuapp.com",
  };

  getDefaultConfigs() {
    return {
      apiConfigs: {
        checkResponseStatus: true,
        CLIENT_BASE_URL: this.#CLIENT_BASE_URLS[this.#RUNTIME_MODE],
        defaultHeaders: {
          Authorization: "",
          "Content-Type": "application/json",
        },
        inputDataPropertiesCheck: true,
        logFailureResponse: false,
        logSuccessfulResponse: false,
        outputDataPropertiesCheck: false,
        requestTimeout: 20000,
        RUNTIME_MODE: this.#RUNTIME_MODE,
        SERVER_BASE_URL: this.#SERVER_BASE_URLS[this.#RUNTIME_MODE],
        validateStatus: false,
      },
      others: {
        appDrawerCurrentAnchor: APP_DRAWER_ANCHORS.left,
        logPerformanceMeasuring: false,
        startupViewMode: VIEW_MODES.LOADING,
      },
      ui: {
        defaultDialogTransitionalComponentType: "Grow",
        dialogTransitionalComponentType: "Grow",
      },
      stateManagement: {
        logActions: true,
      },
    };
  }
  getConfigs() {
    return this.configs;
  }

  runConfigs() {
    logger.setLevel("debug");
  }
}

const appConfigs = new AppConfigs();

export { appConfigs, AppConfigs };
