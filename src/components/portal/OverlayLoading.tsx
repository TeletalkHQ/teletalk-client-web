import Backdrop from "~/components/general/other/Backdrop";
import CircularProgress from "~/components/general/progress/CircularProgress";

import { LoadingState, VoidNoArgsFn } from "~/types";

interface Props {
  loading: LoadingState;
  onGlobalLoadingClose: VoidNoArgsFn;
}

const OverlayLoading: React.FC<Props> = ({ loading, onGlobalLoadingClose }) => {
  return (
    <>
      <Backdrop
        sx={{
          color: loading.color,
          // zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading.open && loading.type === "OVERLAY"}
        onClick={onGlobalLoadingClose}
      >
        <CircularProgress color={loading.progressColor} />
      </Backdrop>
    </>
  );
};

export default OverlayLoading;
