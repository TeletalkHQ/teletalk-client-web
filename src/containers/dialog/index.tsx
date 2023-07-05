import AddContactWithCellphone from "~/containers/dialog/AddContactWithCellphone";
import Contacts from "~/containers/dialog/Contacts";
import EditBio from "~/containers/dialog/EditBio";
import EditFullName from "~/containers/dialog/EditFullName";
import EditProfile from "~/containers/dialog/EditProfile";
import EditUsername from "~/containers/dialog/EditUsername";
import Logout from "~/containers/dialog/Logout";
import Settings from "~/containers/dialog/Settings";
import UserInfo from "~/containers/dialog/UserInfo";

const Dialog = () => {
  return (
    <>
      {[
        AddContactWithCellphone,
        Contacts,
        EditBio,
        EditFullName,
        EditProfile,
        EditUsername,
        Logout,
        Settings,
        UserInfo,
      ].map((Component, i) => (
        <Component key={i} />
      ))}
    </>
  );
};

export default Dialog;
