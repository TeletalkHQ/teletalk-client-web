import { apiBuilder } from "classes/ApiBuilder";
import { stuffStore } from "classes/StuffStore";

const {
  // addBlockRoute,
  // addBlocksRoute,
  addContactRoute,
  // addContactsRoute,
  cellphoneRouteBaseUrl,
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
  .setRequirements(cellphoneRouteBaseUrl, getContactsRoute)
  .build();

export { getContactsApi };

const addContactApi = apiBuilder
  .create()
  .setRequirements(cellphoneRouteBaseUrl, addContactRoute)
  .build();

export { addContactApi };
