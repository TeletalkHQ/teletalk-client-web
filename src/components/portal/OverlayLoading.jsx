import CustomBackdrop from "components/generals/others/CustomBackdrop";
import CustomCircularProgress from "components/generals/progresses/CustomCircularProgress";

import { GLOBAL_LOADING_TYPES } from "variables/otherVariables/helpers";

const OverlayLoading = ({ loading, onGlobalLoadingClose }) => {
  return (
    <>
      <CustomBackdrop
        sx={{
          color: loading.color,
          // zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading.open && loading.type === GLOBAL_LOADING_TYPES.OVERLAY}
        onClick={onGlobalLoadingClose}
      >
        <CustomCircularProgress color={loading.progressColor} />
      </CustomBackdrop>
    </>
  );
};

export default OverlayLoading;
