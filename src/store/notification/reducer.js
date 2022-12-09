import { reducerBuilder } from "src/classes/ReducerBuilder";

import { initialNotificationState } from "src/store/notification/initialState";
import { NOTIFICATION_ACTION_TYPES } from "src/store/notification/types";

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
