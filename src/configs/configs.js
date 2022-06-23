const RUNTIME_MODE = process.env.NODE_ENV;

const SERVER_BASE_URL =
  RUNTIME_MODE === "production"
    ? "https://teletalk-server.herokuapp.com"
    : "http://localhost:8080";

const CLIENT_BASE_URL =
  RUNTIME_MODE === "production"
    ? "https://teletalk-client-web.vercel.app"
    : "http://localhost:3000";

const EVENT_EMITTER_EVENTS = {
  ALL_STUFF_RECEIVED: "ALL_STUFF_RECEIVED",
};

export {};

const configs = {
  useThunkReducer: {
    actionLogger: true,
  },

  requester: {
    successResponseLogger: false,
    failureResponseLogger: false,
  },
};

export { CLIENT_BASE_URL, configs, EVENT_EMITTER_EVENTS, SERVER_BASE_URL };
