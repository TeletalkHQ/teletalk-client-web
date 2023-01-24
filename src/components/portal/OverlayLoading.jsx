import Backdrop from "src/components/general/other/Backdrop";
import CircularProgress from "src/components/general/progress/CircularProgress";

import { stateStatics } from "src/store/stateStatics";

const OverlayLoading = ({ loading, onGlobalLoadingClose }) => {
  return (
    <>
      <Backdrop
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
        <CircularProgress color={loading.progressColor} />
      </Backdrop>
    </>
  );
};

export default OverlayLoading;
