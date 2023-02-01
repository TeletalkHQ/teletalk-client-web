import React, { useEffect } from "react";

import { controllers } from "src/controllers";

import { useDispatch } from "src/hooks/useThunkReducer";

const CheckCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(controllers.getCurrentUserData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>Authenticating user... </div>;
};

export default CheckCurrentUser;
