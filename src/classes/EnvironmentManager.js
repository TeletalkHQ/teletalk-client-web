class EnvironmentManager {
  constructor() {
    this.ENVIRONMENT_KEYS = {
      NODE_ENV: "NODE_ENV",
      REACT_APP_RUNTIME_MODE: "REACT_APP_RUNTIME_MODE",
    };

    this.ENVIRONMENT_VALUES = {
      [this.ENVIRONMENT_KEYS.NODE_ENV]: {
        development: "development",
        production: "production",
        test: "test",
      },
      [this.ENVIRONMENT_KEYS.REACT_APP_RUNTIME_MODE]: {
        development: "development",
        production: "production",
        test: "test",
      },
      PORT: 8080,
    };
  }

  getEnvironment(envName) {
    return process.env[envName];
  }
  getAllLocalEnvironments() {
    const environments = { ...this.ENVIRONMENT_KEYS };

    for (const key in this.ENVIRONMENT_KEYS) {
      environments[key] = this.getEnvironment(key);
    }

    return environments;
  }
  setEnvironment(envName, value) {
    process.env[envName] = value;
  }

  getNodeEnv() {
    return this.getEnvironment(this.ENVIRONMENT_KEYS.NODE_ENV);
  }
  getNodeEnvValues() {
    return this.ENVIRONMENT_VALUES.NODE_ENV;
  }
}

const environmentManager = new EnvironmentManager();

module.exports = {
  environmentManager,
  EnvironmentManager,
  envManager: environmentManager,
};
