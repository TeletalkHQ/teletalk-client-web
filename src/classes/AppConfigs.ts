import { envManager } from "~/classes/EnvironmentManager";

import { UiConfig } from "~/types";

class AppConfigs {
  #env = envManager.getAllLocalEnvironments();

  #RUNTIME_MODE = this.#env.NEXT_PUBLIC_RUNTIME_MODE;

  #CLIENT_BASE_URLS = {
    development: this.#env.NEXT_PUBLIC_CLIENT_BASE_URL_DEVELOPMENT,
    production: this.#env.NEXT_PUBLIC_CLIENT_BASE_URL_PRODUCTION,
  };
  #SERVER_BASE_URLS = {
    development_1: this.#env.NEXT_PUBLIC_DEVELOPMENT_SERVER_BASE_URL_1,
    development_2: this.#env.NEXT_PUBLIC_DEVELOPMENT_SERVER_BASE_URL_2,
    production_1: this.#env.NEXT_PUBLIC_PRODUCTION_SERVER_BASE_URL_1,
    production_2: this.#env.NEXT_PUBLIC_PRODUCTION_SERVER_BASE_URL_2,
  };
  #SERVER_BASE_URL_INDEX = (() => {
    console.log(process.env.NEXT_PUBLIC_DEVELOPMENT_CLIENT_BASE_URL);
    console.log(process.env.NEXT_PUBLIC_RUNTIME_MODE);

    const indexKey = `NEXT_PUBLIC_${process.env.NEXT_PUBLIC_RUNTIME_MODE.toUpperCase()}_SERVER_BASE_URL_INDEX`;
    const index = this.#env[indexKey];
    if (index) return index;

    const defaultIndexKey = `NEXT_PUBLIC_${process.env.NEXT_PUBLIC_RUNTIME_MODE.toUpperCase()}_SERVER_BASE_URL_DEFAULT_INDEX`;
    return this.#env[defaultIndexKey];
  })();

  #configs = this.#getDefaultConfigs();

  #getServerBaseUrl() {
    if (
      this.#env.NEXT_PUBLIC_RUNTIME_MODE ===
      envManager.ENVIRONMENT_VALUES.NEXT_PUBLIC_RUNTIME_MODE.development
    )
      return this.#SERVER_BASE_URLS.development_1;

    const index = this.#SERVER_BASE_URL_INDEX;
    const runtimeMode = `${process.env.NEXT_PUBLIC_RUNTIME_MODE}_${index}`;
    return this.#SERVER_BASE_URLS[runtimeMode];
  }

  #getDefaultConfigs() {
    const uiConfig: UiConfig = {
      appDrawerCurrentAnchor: "left",
      dialogDefaultTransition: "Grow",
      maxNotification: 10,
    };

    return {
      apiConfigs: {
        checkResponseStatus: true,
        CLIENT_BASE_URL:
          this.#CLIENT_BASE_URLS[process.env.NEXT_PUBLIC_RUNTIME_MODE],
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
        RUNTIME_MODE: process.env.NEXT_PUBLIC_RUNTIME_MODE,
      },
      ui: uiConfig,
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
