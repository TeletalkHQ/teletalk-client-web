import { envManager } from "classes/EnvironmentManager";

const RUNTIME_MODE = envManager.getEnvironment(
  envManager.ENVIRONMENT_KEYS.REACT_APP_RUNTIME_MODE
);

const SERVER_BASE_URLS = {
  production: "https://teletalk-server.herokuapp.com",
  development: "http://localhost:8080",
};
const CLIENT_BASE_URLS = {
  production: "https://teletalk-client-web.vercel.app",
  development: "http://localhost:3000",
};

const SERVER_BASE_URL = SERVER_BASE_URLS[RUNTIME_MODE];
const CLIENT_BASE_URL = CLIENT_BASE_URLS[RUNTIME_MODE];

const EVENT_EMITTER_EVENTS = {
  ALL_STUFF_RECEIVED: "ALL_STUFF_RECEIVED",
};

export {};

const configs = {
  useThunkReducer: {
    actionLogger: true,
  },
  requestConfigs: {
    timeout: 20000,
    defaultHeaders: { "Content-Type": "application/json", Authorization: "" },
    validateStatus: false,
  },
  requester: {
    logSuccessfulResponse: false,
    logFailureResponse: false,
  },
};

export {
  CLIENT_BASE_URL,
  CLIENT_BASE_URLS,
  configs,
  EVENT_EMITTER_EVENTS,
  SERVER_BASE_URL,
  SERVER_BASE_URLS,
};
