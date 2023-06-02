import { eventBuilder } from "~/classes/websocket/EventBuilder";
import { eventHandler } from "~/classes/websocket/EventHandler";
import { stuffStore } from "~/classes/StuffStore";

class EventManager {
  #eventTemplate = eventHandler.create({});

  constructor() {
    this.events = {
      getChatInfo: this.#eventTemplate,
      getPrivateChats: this.#eventTemplate,
      joinRoom: this.#eventTemplate,
      logout: this.#eventTemplate,
      ping: this.#eventTemplate,
      sendPrivateMessage: this.#eventTemplate,
    };
  }

  #buildWithRoute() {
    const events = stuffStore.events;
    Object.entries(events).forEach(([name, route]) => {
      this.events[name] = eventBuilder
        .create()
        .setRequirements({ route })
        .build();
    });
  }

  build() {
    this.#buildWithRoute();
  }
}

const eventManager = new EventManager();

export { eventManager, EventManager };
