import { envManager } from "classes/EnvironmentManager";

import {
  APP_DRAWER_ANCHORS,
  VIEW_MODES,
} from "variables/otherVariables/helpers";

class AppConfigs {
  constructor() {
    this.configs = this.getDefaultConfigs();

    this.runConfigs();
  }
  #RUNTIME_MODE = envManager.getEnvironment(
    envManager.ENVIRONMENT_KEYS.REACT_APP_RUNTIME_MODE
  );
  #CLIENT_BASE_URLS = (() => {
    const { CLIENT_BASE_URL_DEVELOPMENT, CLIENT_BASE_URL_PRODUCTION } =
      envManager.getAllLocalEnvironments();
    return {
      development: CLIENT_BASE_URL_DEVELOPMENT,
      production: CLIENT_BASE_URL_PRODUCTION,
    };
  })();
  #SERVER_BASE_URLS = (() => {
    const { SERVER_BASE_URL_DEVELOPMENT, SERVER_BASE_URL_PRODUCTION } =
      envManager.getAllLocalEnvironments();
    return {
      development: SERVER_BASE_URL_DEVELOPMENT,
      production: SERVER_BASE_URL_PRODUCTION,
    };
  })();

  getDefaultConfigs() {
    return {
      apiConfigs: {
        checkResponseStatus: true,
        CLIENT_BASE_URL: this.#CLIENT_BASE_URLS[this.#RUNTIME_MODE],
        defaultHeaders: {
          Authorization: "",
          "Content-Type": "application/json",
        },
        inputDataFieldsCheck: true,
        logFailureResponse: false,
        logSuccessfulResponse: false,
        outputDataPropertiesCheck: false,
        requestTimeout: 60000,
        SERVER_BASE_URL: this.#SERVER_BASE_URLS[this.#RUNTIME_MODE],
        validateStatus: false,
      },
      others: {
        appDrawerCurrentAnchor: APP_DRAWER_ANCHORS.left,
        logPerformanceMeasuring: false,
        RUNTIME_MODE: this.#RUNTIME_MODE,
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
