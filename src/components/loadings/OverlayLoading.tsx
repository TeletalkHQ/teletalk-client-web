import Backdrop from "~/components/general/other/Backdrop";
import CircularProgress from "~/components/general/progress/CircularProgress";
import { useGlobalStore } from "~/store";

const OverlayLoading = () => {
  const globalState = useGlobalStore();

  return (
    <>
      <Backdrop
        sx={{
          color: globalState.globalLoading.color,
          // zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={
          globalState.globalLoading.open &&
          globalState.globalLoading.type === "OVERLAY"
        }
        onClick={globalState.closeGlobalLoading}
      >
        <CircularProgress color={globalState.globalLoading.progressColor} />
      </Backdrop>
    </>
  );
};

export default OverlayLoading;
