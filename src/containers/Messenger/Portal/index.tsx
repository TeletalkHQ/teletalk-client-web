import AddContactWithCellphone from "./Dialog/AddContactWithCellphone";
import AddContactWithUserId from "./Dialog/AddContactWithUserId";
import BlockUser from "./Dialog/BlockUser";
import Contacts from "./Dialog/Contacts";
import EditBio from "./Dialog/EditBio";
import EditContactWithCellphone from "./Dialog/EditContactWithCellphone";
import EditFullName from "./Dialog/EditFullName";
import EditProfile from "./Dialog/EditProfile";
import EditUsername from "./Dialog/EditUsername";
import Logout from "./Dialog/Logout";
import PrivacyAndSecurity from "./Dialog/PrivacyAndSecurity";
import RemoveContact from "./Dialog/RemoveContact";
import Settings from "./Dialog/Settings";
import UserInfo from "./Dialog/UserInfo";
import Drawer from "./Drawer";

const Portal = () => {
  return (
    <>
      <Drawer />

      {[
        AddContactWithCellphone,
        AddContactWithUserId,
        BlockUser,
        Contacts,
        EditBio,
        EditContactWithCellphone,
        EditFullName,
        EditProfile,
        EditUsername,
        Logout,
        PrivacyAndSecurity,
        RemoveContact,
        Settings,
        UserInfo,
      ].map((Component, i) => (
        <Component key={i} />
      ))}
    </>
  );
};

export default Portal;
