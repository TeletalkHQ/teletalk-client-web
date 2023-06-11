class EnvironmentManager {
  getEnv() {
    return process.env;
  }

  getNodeEnv() {
    return this.getEnv().NODE_ENV;
  }
}

const environmentManager = new EnvironmentManager();

export { EnvironmentManager, environmentManager as envManager };
