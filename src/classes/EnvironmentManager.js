import { EnvironmentManager as EnvironmentManagerMain } from "utility-store/src/classes/EnvironmentManager";

class EnvironmentManager extends EnvironmentManagerMain {
  constructor() {
    super();

    this.ENVIRONMENT_KEYS = {
      NODE_ENV: "NODE_ENV",
      REACT_APP_RUNTIME_MODE: "REACT_APP_RUNTIME_MODE",
    };

    this.ENVIRONMENT_VALUES = {
      NODE_ENV: {
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

  getNodeEnv() {
    return this.getEnvironment(this.ENVIRONMENT_KEYS.NODE_ENV);
  }
  getNodeEnvValues() {
    return this.ENVIRONMENT_VALUES.NODE_ENV;
  }
}

const environmentManager = new EnvironmentManager();

export {
  environmentManager,
  EnvironmentManager,
  environmentManager as envManager,
};
