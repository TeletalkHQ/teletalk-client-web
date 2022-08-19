import CustomList from "components/generals/boxes/CustomList";
import CustomListItem from "components/generals/boxes/CustomListItem";

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
      <CustomList sx={{ width: "20%" }}>
        {sidebarList.map((item, index) => {
          return (
            //TODO Flex list item
            <CustomListItem
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
            </CustomListItem>
          );
        })}
      </CustomList>
    </>
  );
};

export default SideBarList;
