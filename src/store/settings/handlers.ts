const updateProfile = (payload, prevState) => {
  return {
    profile: { ...prevState.profile, ...payload.profile },
  };
};

const settingsReducerHandlers = { updateProfile };

export { settingsReducerHandlers };
