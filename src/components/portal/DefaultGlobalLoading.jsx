import CustomBackdrop from "components/generals/otherGeneralComponents/CustomBackdrop";
import CustomCircularProgress from "components/generals/progresses/CustomCircularProgress";

const DefaultGlobalLoading = ({ globalLoadingState, onBackdropClose }) => {
  return (
    <>
      <CustomBackdrop
        sx={{
          color: globalLoadingState.color,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={globalLoadingState.open}
        onClick={onBackdropClose}
      >
        <CustomCircularProgress color={globalLoadingState.progressColor} />
      </CustomBackdrop>
    </>
  );
};

export default DefaultGlobalLoading;
