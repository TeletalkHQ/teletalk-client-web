let handleRaiseNotification = () => {};
let handleCloseSnack = () => {};

const snackbarInjector = ({
  enqueueSnackbar: injectedEnqueue,
  closeSnackbar: injectedCloser,
}) => {
  handleRaiseNotification = injectedEnqueue;
  handleCloseSnack = injectedCloser;
};

export { snackbarInjector, handleRaiseNotification, handleCloseSnack };
