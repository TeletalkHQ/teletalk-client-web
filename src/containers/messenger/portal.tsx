import Drawer from "~/components/drawer";
import AddContactWithCellphone from "~/components/messenger/dialog/addContactWithCellphone";
import Contacts from "~/components/messenger/dialog/contacts";
import EditBio from "~/components/messenger/dialog/editBio";
import EditContactWithCellphone from "~/components/messenger/dialog/editContactWithCellphone";
import EditFullName from "~/components/messenger/dialog/editFullName";
import EditProfile from "~/components/messenger/dialog/editProfile";
import EditUsername from "~/components/messenger/dialog/editUsername";
import Logout from "~/components/messenger/dialog/logout";
import Settings from "~/components/messenger/dialog/settings";
import UserInfo from "~/components/messenger/dialog/userInfo";

const Portal = () => {
  return (
    <>
      <Drawer />

      {[
        AddContactWithCellphone,
        Contacts,
        EditBio,
        EditContactWithCellphone,
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

export default Portal;
