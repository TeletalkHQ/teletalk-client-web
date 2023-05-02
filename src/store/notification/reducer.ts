import { reducerBuilder } from "src/classes/ReducerBuilder";

import { initialNotificationState } from "src/store/notification/initialState";
import { NOTIFICATION_ACTION_TYPES } from "src/store/notification/types";
import { notificationReducerHandlers } from "src/store/notification/handlers";

const notificationReducerCases = {
  [NOTIFICATION_ACTION_TYPES.NEW_NOTIFICATION]: (payload, state) =>
    notificationReducerHandlers.pushNewNotification(payload, state),
};

const notificationReducer = reducerBuilder
  .create()
  .reducerName("notificationReducer")
  .reducerCases(notificationReducerCases)
  .initialState(initialNotificationState())
  .build();

export { notificationReducer };
