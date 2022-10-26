import { eventManager } from "utility-store/src/classes/EventManager";
import { appOptions } from "classes/AppOptions";
import { systemController } from "classes/SystemController";

class JobsHandler {
  emitAllStuffReceived() {
    const {
      EVENT_EMITTER_EVENTS: { ALL_STUFF_RECEIVED },
    } = appOptions.getOptions();

    eventManager.emitEvent(ALL_STUFF_RECEIVED);
    systemController.changeEventStatusToDone(ALL_STUFF_RECEIVED);
  }
}

const jobsHandler = new JobsHandler();

export { JobsHandler, jobsHandler };

//? One time jobs
