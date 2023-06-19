import { reducerBuilder } from "~/classes/ReducerBuilder";
import { notificationReducerHandlers } from "~/store/notification/handlers";
import { initialNotificationState } from "~/store/notification/initialState";
import { NOTIFICATION_ACTION_TYPES } from "~/store/notification/types";

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
