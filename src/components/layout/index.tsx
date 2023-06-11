import React, { useEffect, useState } from "react";

import { events } from "~/events";

interface Props {
  children: JSX.Element;
}
const Layout: React.FC<Props> = ({ children }) => {
  const [forceUpdate, setForceUpdate] = useState(false);

  useEffect(() => {
    const updater = () => {
      setForceUpdate(!forceUpdate);
    };
    window.updater = updater;
  }, [forceUpdate]);

  useEffect(() => {
    events.websocket.otherEvents();
  }, []);

  return <>{children}</>;
};

export default Layout;
