import { actions } from "actions/actions";

import { appOptions } from "classes/AppOptions";
import { systemController } from "classes/SystemController";

import AddNewContactDialog from "components/dialogs/AddNewContact";
import Contacts from "components/dialogs/Contacts";
import LogoutDialog from "components/dialogs/Logout";

import { defaultDialogStateItemProps } from "functions/utilities/stateUtilities";

import { useMainContext } from "hooks/useMainContext";

const DialogContainer = () => {
  const {
    hooksOutput: { dispatch },
  } = useMainContext();

  const handleDialogClose = (dialogName) => {
    dispatch(
      actions.dialogOpenChange({
        ...defaultDialogStateItemProps(),
        dialogName,
      })
    );
  };

  return (
    <>
      {systemController.getEventStatus(
        appOptions.getEventEmitterEvents().ALL_STUFF_RECEIVED
      ) === "done" &&
        [AddNewContactDialog, Contacts, LogoutDialog].map((Component, i) => (
          <Component key={i} onDialogClose={handleDialogClose} />
        ))}
    </>
  );
};

export default DialogContainer;
