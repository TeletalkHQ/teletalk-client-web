import AddServer from "~/components/initialSetup/dialog/addServer";
import Servers from "~/components/initialSetup/dialog/servers";

const Portal = () => {
  return (
    <>
      {[Servers, AddServer].map((Component, i) => (
        <Component key={i} />
      ))}
    </>
  );
};

export default Portal;
