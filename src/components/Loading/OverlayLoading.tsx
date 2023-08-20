import { useGlobalStore } from "~/store";

import { Progress } from "..";
import Backdrop from "./Backdrop";

const OverlayLoading = () => {
  const globalState = useGlobalStore();

  return (
    <>
      <Backdrop
        sx={{
          color: globalState.loading.color,
          // zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={
          globalState.loading.open && globalState.loading.type === "OVERLAY"
        }
        onClick={globalState.closeOverlayLoading}
      >
        <Progress.Circular color={globalState.loading.progressColor} />
      </Backdrop>
    </>
  );
};

export default OverlayLoading;
