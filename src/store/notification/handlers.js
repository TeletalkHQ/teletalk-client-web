const pushNewNotification = (payload, state) => {
  const notificationType = payload.type;

  const copyNotifications = { ...state.notifications };
  console.log(copyNotifications);

  const targetNotifications = copyNotifications[notificationType];
  const copyTargetNotifications = [...targetNotifications];
  copyTargetNotifications.push(payload);

  copyNotifications[notificationType] = copyTargetNotifications;

  return { notifications: copyNotifications };
};

const notificationReducerHandlers = { pushNewNotification };

export { notificationReducerHandlers };
