import { reducerBuilder } from "~/classes/ReducerBuilder";

import { initialNotificationState } from "~/store/notification/initialState";
import { NOTIFICATION_ACTION_TYPES } from "~/store/notification/types";
import { notificationReducerHandlers } from "~/store/notification/handlers";

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
