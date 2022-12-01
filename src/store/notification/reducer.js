import { reducerBuilder } from "classes/ReducerBuilder";

import { initialNotificationState } from "store/notification/initialState";
import { NOTIFICATION_ACTION_TYPES } from "store/notification/types";

const notificationReducerCases = {
  [NOTIFICATION_ACTION_TYPES.ERROR_NOTIFICATION]: (payload) => payload,
};

const notificationReducer = reducerBuilder
  .create()
  .reducerName("notificationReducer")
  .reducerCases(notificationReducerCases)
  .initialState(initialNotificationState())
  .build();

export { notificationReducer };
