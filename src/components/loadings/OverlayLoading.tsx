import Backdrop from "~/components/general/other/Backdrop";
import CircularProgress from "~/components/general/progress/CircularProgress";
import { useGlobalStore } from "~/store";

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
        <CircularProgress color={globalState.loading.progressColor} />
      </Backdrop>
    </>
  );
};

export default OverlayLoading;
