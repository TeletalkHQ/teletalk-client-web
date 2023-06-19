import { Divider } from "@mui/material";

import List from "~/components/dialog/settings/List";
import ProfileOverview from "~/components/dialog/settings/ProfileOverview";
import Box from "~/components/general/box";
import { VoidNoArgsFn } from "~/types";

interface Props {
  fullName: string;
  fullNumber: string;
  username: string;
  onSettingItemClick: VoidNoArgsFn;
}

const SettingsContent: React.FC<Props> = ({
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
        <List onSettingItemClick={onSettingItemClick} />
      </Box.List>
    </>
  );
};

export default SettingsContent;
