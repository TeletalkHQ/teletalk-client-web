import { Divider } from "@mui/material";

import { Box } from "~/components";

import { OnSettingItemClick } from "../types";
import List from "./List";
import ProfileOverview from "./ProfileOverview";

interface Props {
  fullName: string;
  fullNumber: string;
  username: string;
  onSettingItemClick: OnSettingItemClick;
}

const Content: React.FC<Props> = ({
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

export default Content;
