import { Backdrop, CircularProgress } from "@mui/material";

const DefaultGlobalLoading = ({ globalLoadingState, onBackdropClose }) => {
  return (
    <>
      <Backdrop
        sx={{
          color: globalLoadingState.color,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={globalLoadingState.open}
        onClick={onBackdropClose}
      >
        <CircularProgress color={globalLoadingState.progressColor} />
      </Backdrop>
    </>
  );
};

export default DefaultGlobalLoading;
