import Servers from "~/components/initialSetup/dialog/servers";

const Portal = () => {
  return (
    <>
      {[Servers].map((Component, i) => (
        <Component key={i} />
      ))}
    </>
  );
};

export default Portal;
