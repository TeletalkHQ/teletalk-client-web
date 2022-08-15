import { envManager } from "classes/EnvironmentManager";

class AppConfigs {
  constructor() {
    this.configs = {
      useThunkReducer: {
        actionLogger: true,
      },
      others: {
        RUNTIME_MODE: this.#RUNTIME_MODE,
        SERVER_BASE_URL: this.#SERVER_BASE_URLS[this.#RUNTIME_MODE],
        CLIENT_BASE_URL: this.#CLIENT_BASE_URLS[this.#RUNTIME_MODE],
      },
      apiConfigs: {
        checkResponseStatus: true,
        defaultHeaders: {
          Authorization: "",
          "Content-Type": "application/json",
        },
        requestTimeout: 20000,
        validateStatus: false,
        inputDataPropertiesCheck: true,
        outputDataPropertiesCheck: false,
        logFailureResponse: false,
        logSuccessfulResponse: false,
      },
    };
  }
  #RUNTIME_MODE = envManager.getEnvironment(
    envManager.ENVIRONMENT_KEYS.REACT_APP_RUNTIME_MODE
  );
  #CLIENT_BASE_URLS = {
    production: "https://teletalk-client-web.vercel.app",
    development: "http://localhost:3000",
  };
  #SERVER_BASE_URLS = {
    production: "https://teletalk-server.herokuapp.com",
    development: "http://localhost:8080",
  };

  checkAndExecute(condition, callback) {
    if (condition) return callback();
  }

  getConfigs() {
    return this.configs;
  }
}

const appConfigs = new AppConfigs();

export { appConfigs, AppConfigs };
