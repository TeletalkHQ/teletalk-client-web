import ContextMenu from "~/components/general/other/ContextMenu";
import AddServer from "~/components/globalDialogs/addServer";
import ServerSetup from "~/components/globalDialogs/serverSetup";
import Servers from "~/components/globalDialogs/servers";
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

      {[AddServer, ServerSetup, Servers].map((Component, i) => (
        <Component key={i} />
      ))}

      {children}
    </>
  );
};

export default MainLayout;
