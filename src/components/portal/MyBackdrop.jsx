import { Backdrop, CircularProgress } from "@mui/material";

const MyBackdrop = ({ backdropState, onBackdropClose }) => {
  return (
    <>
      <Backdrop
        sx={{
          color: backdropState.color,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={backdropState.open}
        onClick={onBackdropClose}
      >
        <CircularProgress color={backdropState.progressColor} />
      </Backdrop>
    </>
  );
};

export default MyBackdrop;
