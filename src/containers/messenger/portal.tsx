import Drawer from "~/components/drawer";
import FullPageLoading from "~/components/loadings/FullPageLoading";
import OverlayLoading from "~/components/loadings/OverlayLoading";
import AddContactWithCellphone from "~/components/messenger/dialog/addContactWithCellphone";
import Contacts from "~/components/messenger/dialog/contacts";
import EditBio from "~/components/messenger/dialog/editBio";
import EditFullName from "~/components/messenger/dialog/editFullName";
import EditProfile from "~/components/messenger/dialog/editProfile";
import EditUsername from "~/components/messenger/dialog/editUsername";
import Logout from "~/components/messenger/dialog/logout";
import Settings from "~/components/messenger/dialog/settings";
import UserInfo from "~/components/messenger/dialog/userInfo";

const Portal = () => {
  return (
    <>
      <FullPageLoading />
      <Drawer />
      <OverlayLoading />
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

export default Portal;
