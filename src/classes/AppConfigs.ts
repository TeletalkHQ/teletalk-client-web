import { envManager } from "~/classes/EnvironmentManager";

import { RuntimeMode } from "~/types";

type BaseUrl = {
  [key in RuntimeMode]: string;
};

class AppConfigs {
  private env = envManager.getEnv();
  private RUNTIME_MODE = this.env.NEXT_PUBLIC_RUNTIME_MODE;

  private CLIENT_BASE_URLS: BaseUrl = {
    development: this.env.NEXT_PUBLIC_CLIENT_BASE_URL,
    production: this.env.NEXT_PUBLIC_CLIENT_BASE_URL,
  };
  private SERVER_BASE_URLS: BaseUrl = {
    development: this.env.NEXT_PUBLIC_SERVER_BASE_URL,
    production: this.env.NEXT_PUBLIC_SERVER_BASE_URL,
  };

  private configs = {
    api: {
      clientBaseUrl: this.CLIENT_BASE_URLS[this.RUNTIME_MODE],
      defaultHeaders: {
        Authorization: "",
        "Content-Type": "application/json",
      },
      requestTimeout: 60000,
      serverBaseUrl: this.getServerBaseUrl(),
      shouldCheckInputDataFields: true,
      shouldCheckOutputDataFields: false,
      shouldCheckResponseStatus: true,
      shouldLogFailureResponse: false,
      shouldLogSuccessfulResponse: false,
      shouldValidateStatus: false,
    },
    others: {
      runtimeMode: this.RUNTIME_MODE,
      shouldLogPerformanceMeasuring: false,
    },
    stateManagement: {
      shouldLogActions: false,
    },
    ui: {
      appDrawerCurrentAnchor: "left",
      dialogDefaultTransition: "Grow",
      maxNotification: 10,
    },
  };

  private getServerBaseUrl() {
    if (this.RUNTIME_MODE === "development")
      return this.SERVER_BASE_URLS.development;

    return this.SERVER_BASE_URLS.production;
  }

  getConfigs() {
    return this.configs;
  }

  setDebugLevel() {
    logger.onAll();
  }
}

const appConfigs = new AppConfigs();

export { appConfigs, AppConfigs };
