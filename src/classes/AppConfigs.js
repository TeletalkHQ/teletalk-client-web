import { envManager } from "src/classes/EnvironmentManager";

import { stateStatics } from "src/store/stateStatics";

class AppConfigs {
  #env = envManager.getAllLocalEnvironments();

  #RUNTIME_MODE = this.#env.REACT_APP_RUNTIME_MODE;

  #CLIENT_BASE_URLS = {
    development: this.#env.REACT_APP_CLIENT_BASE_URL_DEVELOPMENT,
    production: this.#env.REACT_APP_CLIENT_BASE_URL_PRODUCTION,
  };
  #SERVER_BASE_URLS = {
    development_1: this.#env.REACT_APP_DEVELOPMENT_SERVER_BASE_URL_1,
    development_2: this.#env.REACT_APP_DEVELOPMENT_SERVER_BASE_URL_2,
    production_1: this.#env.REACT_APP_PRODUCTION_SERVER_BASE_URL_1,
    production_2: this.#env.REACT_APP_PRODUCTION_SERVER_BASE_URL_2,
  };
  #SERVER_BASE_URL_INDEX = (() => {
    const indexKey = `REACT_APP_${this.#RUNTIME_MODE.toUpperCase()}_SERVER_BASE_URL_INDEX`;
    const index = this.#env[indexKey];
    if (index) return index;

    const defaultIndexKey = `REACT_APP_${this.#RUNTIME_MODE.toUpperCase()}_SERVER_BASE_URL_DEFAULT_INDEX`;
    return this.#env[defaultIndexKey];
  })();

  #configs = this.#getDefaultConfigs();

  #getServerBaseUrl() {
    if (
      this.#env.REACT_APP_RUNTIME_MODE ===
      envManager.ENVIRONMENT_VALUES.REACT_APP_RUNTIME_MODE.development
    )
      return this.#SERVER_BASE_URLS.development_1;

    const index = this.#SERVER_BASE_URL_INDEX;
    const runtimeMode = `${this.#RUNTIME_MODE}_${index}`;
    return this.#SERVER_BASE_URLS[runtimeMode];
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
        maxNotification: 10,
      },
      stateManagement: {
        logActions: false,
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
