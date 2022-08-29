import { EnvironmentManager as EnvironmentManagerMain } from "utility-store/src/classes/EnvironmentManager";

class EnvironmentManager extends EnvironmentManagerMain {
  constructor() {
    super();

    this.ENVIRONMENT_KEYS = {
      NODE_ENV: "NODE_ENV",
      REACT_APP_RUNTIME_MODE: "REACT_APP_RUNTIME_MODE",
    };

    this.ENVIRONMENT_VALUES = {
      [this.ENVIRONMENT_KEYS.REACT_APP_RUNTIME_MODE]: {
        development: "development",
        production: "production",
        test: "test",
      },
    };
  }
}

const environmentManager = new EnvironmentManager();

export {
  environmentManager,
  EnvironmentManager,
  environmentManager as envManager,
};
