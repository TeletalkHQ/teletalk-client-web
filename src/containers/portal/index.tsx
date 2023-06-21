import FullPageLoading from "~/components/loadings/FullPageLoading";
import OverlayLoading from "~/components/loadings/OverlayLoading";
import DialogContainer from "~/containers/dialog";
import Drawer from "~/containers/drawer";

const Portal = () => {
  return (
    <>
      <FullPageLoading />
      <Drawer />
      <OverlayLoading />
      <DialogContainer />
    </>
  );
};

export default Portal;
