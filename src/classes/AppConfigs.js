import { envManager } from "classes/EnvironmentManager";

import { stateStatics } from "store/stateStatics";

class AppConfigs {
  #env = envManager.getAllLocalEnvironments();

  #RUNTIME_MODE = this.#env.REACT_APP_RUNTIME_MODE;

  #CLIENT_BASE_URLS = {
    development: this.#env.REACT_APP_CLIENT_BASE_URL_DEVELOPMENT,
    production: this.#env.REACT_APP_CLIENT_BASE_URL_PRODUCTION,
  };
  #SERVER_BASE_URLS = {
    development: this.#env.REACT_APP_SERVER_BASE_URL_DEVELOPMENT,
    production_1: this.#env.REACT_APP_SERVER_BASE_URL_PRODUCTION_1,
    production_2: this.#env.REACT_APP_SERVER_BASE_URL_PRODUCTION_2,
  };
  #SERVER_BASE_URL_INDEX = this.#env.REACT_APP_SERVER_BASE_URL_INDEX;

  #configs = this.#getDefaultConfigs();

  #getServerBaseUrl() {
    if (
      this.#env.REACT_APP_RUNTIME_MODE ===
      envManager.ENVIRONMENT_VALUES.REACT_APP_RUNTIME_MODE.development
    )
      return this.#SERVER_BASE_URLS.development;

    const index = this.#SERVER_BASE_URL_INDEX;
    const runtimeMode = `${this.#RUNTIME_MODE}_${index}`;
    console.log("index:::", runtimeMode);
    const baseUrl = this.#SERVER_BASE_URLS[runtimeMode];
    console.log("baseUrl:::", baseUrl);
    return baseUrl;
  }

  #getDefaultConfigs() {
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
        SERVER_BASE_URL: this.#getServerBaseUrl(),
        validateStatus: false,
      },
      others: {
        logPerformanceMeasuring: false,
        RUNTIME_MODE: this.#RUNTIME_MODE,
        startupViewMode: stateStatics.VIEW_MODES.INITIAL_SETUP,
      },
      ui: {
        appDrawerCurrentAnchor: stateStatics.APP_DRAWER_ANCHORS.left,
        defaultDialogTransitionalComponentType: "Grow",
        dialogTransitionalComponentType: "Grow",
      },
      stateManagement: {
        logActions: true,
      },
    };
  }

  getConfigs() {
    return this.#configs;
  }

  // runConfigs() {}

  setDebugLevel() {
    logger.setLevel("debug");
  }
}

const appConfigs = new AppConfigs();

export { appConfigs, AppConfigs };
