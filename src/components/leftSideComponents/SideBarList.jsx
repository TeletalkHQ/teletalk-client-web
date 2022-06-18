import { List, ListItem } from "@mui/material";

import { appIcons } from "variables/initials/initialValues/initialValues";

const { allChats, bot, channels, unread, editChats, groups, personal } =
  appIcons;

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
              <item.Icon
              // fontSize="small"
              />
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default SideBarList;
