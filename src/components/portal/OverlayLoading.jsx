import CustomBackdrop from "components/generals/otherGeneralComponents/CustomBackdrop";
import CustomCircularProgress from "components/generals/progresses/CustomCircularProgress";
import { GLOBAL_LOADING_TYPES } from "variables/otherVariables/constants";

const OverlayLoading = ({ globalLoadingState, onGlobalLoadingClose }) => {
  return (
    <>
      <CustomBackdrop
        sx={{
          color: globalLoadingState.color,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={
          globalLoadingState.open &&
          globalLoadingState.type === GLOBAL_LOADING_TYPES.OVERLAY
        }
        onClick={onGlobalLoadingClose}
      >
        <CustomCircularProgress color={globalLoadingState.progressColor} />
      </CustomBackdrop>
    </>
  );
};

export default OverlayLoading;
