import { apiManager } from "~/classes/ApiManager";

import { stuffStore } from "~/classes/StuffStore";

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
} = stuffStore;

const getContactsApi = apiManager
  .create()
  .setRequirements(cellphoneRouteBaseUrl, getContactsRoute)
  .build();

export { getContactsApi };

const addContactApi = apiManager
  .create()
  .setRequirements(cellphoneRouteBaseUrl, addContactRoute)
  .build();

export { addContactApi };
