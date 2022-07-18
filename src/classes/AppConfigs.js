import { envManager } from "classes/EnvironmentManager";

class AppConfigs {
  constructor() {
    this.configs = {
      customAxios: {
        defaultHeaders: {
          Authorization: "",
          "Content-Type": "application/json",
        },
        timeout: 20000,
        validateStatus: false,
      },
      requester: {
        logFailureResponse: false,
        logSuccessfulResponse: false,
      },
      useThunkReducer: {
        actionLogger: true,
      },
      others: {
        RUNTIME_MODE: this.#RUNTIME_MODE,
        SERVER_BASE_URL: this.#SERVER_BASE_URLS[this.#RUNTIME_MODE],
        CLIENT_BASE_URL: this.#CLIENT_BASE_URLS[this.#RUNTIME_MODE],
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
    if (condition) callback();
  }
}

const appConfigs = new AppConfigs();

export { appConfigs, AppConfigs };
