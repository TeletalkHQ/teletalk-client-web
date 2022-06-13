let handleMakeSnack = () => {};
let handleCloseSnack = () => {};

const snackbarInjector = ({
  enqueueSnackbar: injectedEnqueue,
  closeSnackbar: injectedCloser,
}) => {
  handleMakeSnack = injectedEnqueue;
  handleCloseSnack = injectedCloser;
};

export { snackbarInjector, handleMakeSnack, handleCloseSnack };
