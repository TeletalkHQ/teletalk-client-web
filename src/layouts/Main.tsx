import ContextMenu from "~/components/general/other/ContextMenu";
import InitialSetup from "~/components/globalDialogs/initialSetup";
import AddServer from "~/components/initialSetup/dialog/addServer";
import Servers from "~/components/initialSetup/dialog/servers";
import FullPageLoading from "~/components/loadings/FullPageLoading";
import OverlayLoading from "~/components/loadings/OverlayLoading";

interface Props {
  children: JSX.Element;
}

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <FullPageLoading />
      <OverlayLoading />
      <ContextMenu />

      {[AddServer, InitialSetup, Servers].map((Component, i) => (
        <Component key={i} />
      ))}

      {children}
    </>
  );
};

export default MainLayout;
