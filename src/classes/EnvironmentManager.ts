import { EnvironmentManager as EnvironmentManagerMain } from "utility-store";

class EnvironmentManager extends EnvironmentManagerMain {
  constructor() {
    super();

    this.ENVIRONMENT_KEYS = {
      REACT_APP_DEVELOPMENT_CLIENT_BASE_URL:
        "REACT_APP_DEVELOPMENT_CLIENT_BASE_URL",
      REACT_APP_DEVELOPMENT_SERVER_BASE_URL_1:
        "REACT_APP_DEVELOPMENT_SERVER_BASE_URL_1",
      REACT_APP_DEVELOPMENT_SERVER_BASE_URL_2:
        "REACT_APP_DEVELOPMENT_SERVER_BASE_URL_2",
      REACT_APP_DEVELOPMENT_SERVER_BASE_URL_DEFAULT_INDEX:
        "REACT_APP_DEVELOPMENT_SERVER_BASE_URL_DEFAULT_INDEX",
      REACT_APP_DEVELOPMENT_SERVER_BASE_URL_INDEX:
        "REACT_APP_DEVELOPMENT_SERVER_BASE_URL_INDEX",
      REACT_APP_PRODUCTION_CLIENT_BASE_URL:
        "REACT_APP_PRODUCTION_CLIENT_BASE_URL",
      REACT_APP_PRODUCTION_SERVER_BASE_URL_1:
        "REACT_APP_PRODUCTION_SERVER_BASE_URL_1",
      REACT_APP_PRODUCTION_SERVER_BASE_URL_2:
        "REACT_APP_PRODUCTION_SERVER_BASE_URL_2",
      REACT_APP_PRODUCTION_SERVER_BASE_URL_DEFAULT_INDEX:
        "REACT_APP_DEVELOPMENT_SERVER_BASE_URL_DEFAULT_INDEX",
      REACT_APP_PRODUCTION_SERVER_BASE_URL_INDEX:
        "REACT_APP_DEVELOPMENT_SERVER_BASE_URL_INDEX",
      REACT_APP_RUNTIME_MODE: "REACT_APP_RUNTIME_MODE",
    };

    this.ENVIRONMENT_VALUES = {
      REACT_APP_RUNTIME_MODE: {
        development: "development",
        production: "production",
        test: "test",
      },
    };
  }

  getAllLocalEnvironments() {
    const environments = { ...this.ENVIRONMENT_KEYS };

    for (const key in this.ENVIRONMENT_KEYS) {
      environments[key] = this.getEnvironment(key);
    }

    return environments;
  }

  getReactAppRuntimeMode() {
    return this.getEnvironment(this.ENVIRONMENT_KEYS.REACT_APP_RUNTIME_MODE);
  }
  getReactAppRuntimeModeValues() {
    return this.ENVIRONMENT_VALUES.REACT_APP_RUNTIME_MODE;
  }
}

const environmentManager = new EnvironmentManager();

export {
  environmentManager,
  EnvironmentManager,
  environmentManager as envManager,
};
