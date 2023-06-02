import React, { useEffect } from "react";

import { useDispatch } from "react-redux";

import { controllers } from "~/controllers";

const CheckCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(controllers.getCurrentUserData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>Authenticating user... </div>;
};

export default CheckCurrentUser;
