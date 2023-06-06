import { Divider } from "@mui/material";

import ProfileOverview from "~/components/dialog/settings/ProfileOverview";
import List from "~/components/dialog/settings/List";
import Box from "~/components/general/box";

const SettingsContent = ({
  fullName,
  fullNumber,
  onSettingItemClick,
  username,
}) => {
  return (
    <>
      <ProfileOverview
        fullName={fullName}
        fullNumber={fullNumber}
        username={username}
      />

      <Divider style={{ margin: "20px 0px 20px 0px" }} />

      <Box.List>
        <List onSettingItemClick={onSettingItemClick} />{" "}
      </Box.List>
    </>
  );
};

export default SettingsContent;
