import { List, ListItem } from "@mui/material";

import { appIcons } from "variables/initials/initialValues/appIcons";

const { allChats, bot, channels, editChats, groups, personal, unread } =
  appIcons;

//TODO Add to some functionality and add priority to each
const sidebarList = [
  allChats,
  unread,
  personal,
  channels,
  groups,
  bot,
  editChats,
];

const SideBarList = () => {
  return (
    <>
      <List sx={{ width: "20%" }}>
        {sidebarList.map((item, index) => {
          return (
            <ListItem
              button
              key={index}
              selected={index === 4}
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "65px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <item.Icon />
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default SideBarList;
