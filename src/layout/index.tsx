import FullPageLoading from "~/components/loadings/FullPageLoading";
import OverlayLoading from "~/components/loadings/OverlayLoading";

interface Props {
  children: JSX.Element;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <FullPageLoading />
      <OverlayLoading />

      {children}
    </>
  );
};

export default Layout;
