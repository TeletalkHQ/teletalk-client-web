import AddNewContact from "~/containers/dialog/AddNewContact";
import Contacts from "~/containers/dialog/Contacts";
import EditBio from "~/containers/dialog/EditBio";
import EditFullName from "~/containers/dialog/EditFullName";
import EditProfile from "~/containers/dialog/EditProfile";
import EditUsername from "~/containers/dialog/EditUsername";
import Logout from "~/containers/dialog/Logout";
import Settings from "~/containers/dialog/Settings";
import UserInfo from "~/containers/dialog/UserInfo";
import { commonActions } from "~/store/commonActions";
import { stateStatics } from "~/store/stateStatics";

const Dialog = () => {
  const handleDialogClose = (dialogName) => {
    dispatch(commonActions.closeDialog(dialogName));
  };

  return (
    <>
      {state.global.initialSetupDetails.status ===
        stateStatics.INITIAL_SETUP_STATUS.DONE && (
        <>
          {[
            AddNewContact,
            Contacts,
            EditBio,
            EditFullName,
            EditProfile,
            EditUsername,
            Logout,
            Settings,
            UserInfo,
          ].map((Component, i) => (
            <Component key={i} onDialogClose={handleDialogClose} />
          ))}
        </>
      )}
    </>
  );
};

export default Dialog;
