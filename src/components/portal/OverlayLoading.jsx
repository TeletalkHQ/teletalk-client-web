import CustomBackdrop from "src/components/general/other/CustomBackdrop";
import CustomCircularProgress from "src/components/general/progress/CustomCircularProgress";

import { stateStatics } from "src/store/stateStatics";

const OverlayLoading = ({ loading, onGlobalLoadingClose }) => {
  return (
    <>
      <CustomBackdrop
        sx={{
          color: loading.color,
          // zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={
          loading.open &&
          loading.type === stateStatics.GLOBAL_LOADING_TYPES.OVERLAY
        }
        onClick={onGlobalLoadingClose}
      >
        <CustomCircularProgress color={loading.progressColor} />
      </CustomBackdrop>
    </>
  );
};

export default OverlayLoading;
