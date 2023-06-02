import { initialGlobalState } from "~/store/global/initialState";

const handleAddNewContact = (payload, prevState) => {
  return {
    users: [...prevState.users, { ...payload.newContact, isContact: true }],
  };
};

const handleAddNewUser = (payload, prevState) => {
  return { users: [...prevState.users, payload.user] };
};

const handleAddUsers = (payload, prevState) => {
  return { users: [...prevState.users, ...payload.users] };
};

const handleGlobalLoadingStateOpenChange = (payload, prevState) => {
  return {
    globalLoading: {
      ...prevState.globalLoading,
      open: payload.open,
    },
  };
};

const handleAppDrawerStateOpenChange = (payload, prevState) => {
  return {
    appDrawer: {
      ...prevState.appDrawer,
      anchor: {
        ...prevState.appDrawer.anchor,
        [prevState.appDrawer.currentAnchor]: payload.open,
      },
    },
  };
};

const handleDialogOpenChange = (payload, prevState) => ({
  dialogState: {
    ...prevState.dialogState,
    [payload.dialogName]: {
      ...prevState.dialogState[payload.dialogName],
      open: payload.open,
      props: payload.props,
    },
  },
});

const handleOnlineStatusStateChange = (payload, prevState) => ({
  onlineStatus: {
    ...prevState.onlineStatus,
    ...payload,
  },
});

const handleAppProgressionChange = (payload, prevState) => ({
  appProgressions: {
    ...prevState.appProgressions,
    ...payload,
  },
});

const handleResetGlobalState = () => {
  const { initialSetupDetails, ...state } = initialGlobalState();
  return state;
};

const handleUpdateViewMode = (payload) => ({
  viewMode: payload.viewMode,
});

const changeInitialSetupStatus = (payload, prevState) => ({
  initialSetupDetails: {
    ...prevState.initialSetupDetails,
    status: payload.status,
  },
});

const globalReducerHandlers = {
  changeInitialSetupStatus,
  handleAddNewContact,
  handleAddNewUser,
  handleAddUsers,
  handleAppDrawerStateOpenChange,
  handleAppProgressionChange,
  handleDialogOpenChange,
  handleGlobalLoadingStateOpenChange,
  handleOnlineStatusStateChange,
  handleResetGlobalState,
  handleUpdateViewMode,
};

export { globalReducerHandlers };
