class EnvironmentManager {
  getEnvironment(key) {
    return process.env[key];
  }

  constructor() {
    this.ENVIRONMENT_KEYS = {
      NEXT_PUBLIC_DEVELOPMENT_CLIENT_BASE_URL:
        "NEXT_PUBLIC_DEVELOPMENT_CLIENT_BASE_URL",
      NEXT_PUBLIC_DEVELOPMENT_SERVER_BASE_URL_1:
        "NEXT_PUBLIC_DEVELOPMENT_SERVER_BASE_URL_1",
      NEXT_PUBLIC_DEVELOPMENT_SERVER_BASE_URL_2:
        "NEXT_PUBLIC_DEVELOPMENT_SERVER_BASE_URL_2",
      NEXT_PUBLIC_DEVELOPMENT_SERVER_BASE_URL_DEFAULT_INDEX:
        "NEXT_PUBLIC_DEVELOPMENT_SERVER_BASE_URL_DEFAULT_INDEX",
      NEXT_PUBLIC_DEVELOPMENT_SERVER_BASE_URL_INDEX:
        "NEXT_PUBLIC_DEVELOPMENT_SERVER_BASE_URL_INDEX",
      NEXT_PUBLIC_PRODUCTION_CLIENT_BASE_URL:
        "NEXT_PUBLIC_PRODUCTION_CLIENT_BASE_URL",
      NEXT_PUBLIC_PRODUCTION_SERVER_BASE_URL_1:
        "NEXT_PUBLIC_PRODUCTION_SERVER_BASE_URL_1",
      NEXT_PUBLIC_PRODUCTION_SERVER_BASE_URL_2:
        "NEXT_PUBLIC_PRODUCTION_SERVER_BASE_URL_2",
      NEXT_PUBLIC_PRODUCTION_SERVER_BASE_URL_DEFAULT_INDEX:
        "NEXT_PUBLIC_DEVELOPMENT_SERVER_BASE_URL_DEFAULT_INDEX",
      NEXT_PUBLIC_PRODUCTION_SERVER_BASE_URL_INDEX:
        "NEXT_PUBLIC_DEVELOPMENT_SERVER_BASE_URL_INDEX",
      NEXT_PUBLIC_RUNTIME_MODE: "NEXT_PUBLIC_RUNTIME_MODE",
    };

    this.ENVIRONMENT_VALUES = {
      NEXT_PUBLIC_RUNTIME_MODE: {
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
    return this.getEnvironment(this.ENVIRONMENT_KEYS.NEXT_PUBLIC_RUNTIME_MODE);
  }
  getReactAppRuntimeModeValues() {
    return this.ENVIRONMENT_VALUES.NEXT_PUBLIC_RUNTIME_MODE;
  }
}

const environmentManager = new EnvironmentManager();

export {
  environmentManager,
  EnvironmentManager,
  environmentManager as envManager,
};
