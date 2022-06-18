const RUNTIME_MODE = process.env.NODE_ENV;

//CLEANME
const SERVER_BASE_URL =
  RUNTIME_MODE === "production"
    ? "https://teletalk-server.herokuapp.com"
    : "http://localhost:8080";

const CLIENT_BASE_URL =
  RUNTIME_MODE === "production"
    ? "https://teletalk-client.vercel.app"
    : "http://localhost:3000";

const EVENT_EMITTER_EVENTS = {
  ALL_STUFF_RECEIVED: "ALL_STUFF_RECEIVED",
};

export { CLIENT_BASE_URL, SERVER_BASE_URL, EVENT_EMITTER_EVENTS };
