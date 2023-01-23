import React, { useEffect } from "react";

import { userUtilities } from "src/classes/UserUtilities";

import { controllers } from "src/controllers";

import { useDispatch } from "src/hooks/useThunkReducer";
import { commonActions } from "src/store/commonActions";

const CheckCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const TOKEN = userUtilities.getToken();

    if (TOKEN) dispatch(controllers.getCurrentUserData());
    else dispatch(commonActions.changeViewMode.signIn());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>Authenticating user... </div>;
};

export default CheckCurrentUser;
