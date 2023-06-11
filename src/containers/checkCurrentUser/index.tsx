import React, { useEffect } from "react";

import { controllers } from "~/controllers";

const CheckCurrentUser = () => {
  useEffect(() => {
    dispatch(controllers.getCurrentUserData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>Authenticating user... </div>;
};

export default CheckCurrentUser;
