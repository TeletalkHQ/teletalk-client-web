import React, { useEffect } from "react";

import { persistentStorage } from "src/classes/PersistentStorage";

import { controllers } from "src/controllers";

import { useDispatch } from "src/hooks/useThunkReducer";
import { commonActions } from "src/store/commonActions";

const CheckCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const TOKEN = persistentStorage.getItem(
      persistentStorage.STORAGE_KEYS.TOKEN
    );

    if (TOKEN) dispatch(controllers.getCurrentUserData());
    else dispatch(commonActions.changeViewMode.signIn());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>Authenticating user... </div>;
};

export default CheckCurrentUser;
