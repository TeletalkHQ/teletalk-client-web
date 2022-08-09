import { apiBuilder } from "classes/Builders/ApiBuilder";
import { stuffStore } from "classes/StuffStore";

const {
  // addBlockRoute,
  // addBlocksRoute,
  addContactRoute,
  // addContactsRoute,
  // editContactRoute,
  getContactsRoute,
  // removeBlockRoute,
  // removeBlocksRoute,
  // removeContactRoute,
  // removeContactsRoute,
  // shareContactRoute,
  // shareContactsRoute,
} = stuffStore.routes;

const getContactsApi = apiBuilder
  .create()
  .setRequirements(getContactsRoute)
  .build();

export { getContactsApi };

const addContactApi = apiBuilder
  .create()
  .setRequirements(addContactRoute)
  .build();

export { addContactApi };
