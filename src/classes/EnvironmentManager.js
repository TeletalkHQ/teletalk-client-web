import { EnvironmentManager as EnvironmentManagerMain } from "utility-store/src/classes/EnvironmentManager";

class EnvironmentManager extends EnvironmentManagerMain {
  constructor() {
    super();

    this.ENVIRONMENT_KEYS = {
      REACT_APP_CLIENT_BASE_URL_DEVELOPMENT:
        "REACT_APP_CLIENT_BASE_URL_DEVELOPMENT",
      REACT_APP_CLIENT_BASE_URL_PRODUCTION:
        "REACT_APP_CLIENT_BASE_URL_PRODUCTION",
      REACT_APP_RUNTIME_MODE: "REACT_APP_RUNTIME_MODE",
      REACT_APP_SERVER_BASE_URL_DEVELOPMENT:
        "REACT_APP_SERVER_BASE_URL_DEVELOPMENT",
      REACT_APP_SERVER_BASE_URL_PRODUCTION_1:
        "REACT_APP_SERVER_BASE_URL_PRODUCTION",
      REACT_APP_SERVER_BASE_URL_PRODUCTION_2:
        "REACT_APP_SERVER_BASE_URL_PRODUCTION",
      REACT_APP_SERVER_BASE_URL_INDEX: "REACT_APP_SERVER_BASE_URL_INDEX",
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
