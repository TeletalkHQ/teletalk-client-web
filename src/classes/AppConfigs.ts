import { RuntimeMode, StringMap, UiConfig } from "~/types";

type BaseUrl = {
  [key in RuntimeMode]: string;
};

type Configs = {
  [key: string]: StringMap;
  ui: UiConfig;
};

class AppConfigs {
  private RUNTIME_MODE = process.env.NEXT_PUBLIC_RUNTIME_MODE;

  private CLIENT_BASE_URLS: BaseUrl = {
    development: process.env.NEXT_PUBLIC_CLIENT_BASE_URL,
    production: process.env.NEXT_PUBLIC_CLIENT_BASE_URL,
  };
  private SERVER_BASE_URLS: BaseUrl = {
    development: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
    production: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
  };

  private configs: Configs = {
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
      drawerDefaultAnchor: "left",
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
    // console.onAll();
  }
}

const appConfigs = new AppConfigs();

export { appConfigs, AppConfigs };
