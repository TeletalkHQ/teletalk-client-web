const RUNTIME_MODE = process.env.NODE_ENV;

//CLEANME
const BASE_URL =
  RUNTIME_MODE === "production"
    ? "https://teletalk-server.herokuapp.com"
    : "http://localhost:8080";

const EVENT_EMITTER_EVENTS = {
  ALL_STUFF_RECEIVED: "ALL_STUFF_RECEIVED",
};

logger._log(BASE_URL, RUNTIME_MODE);

export { RUNTIME_MODE, BASE_URL, EVENT_EMITTER_EVENTS };
