import CustomList from "src/components/general/box/CustomList";
import CustomListItem from "src/components/general/box/CustomListItem";

import { Icons } from "src/components/other/Icons";

//TODO: Add to some functionality and add priority to each
const sidebarList = [
  Icons.AllChatsOutlined7,
  Icons.UnreadOutlined,
  Icons.PersonalOutlined,
  Icons.ChannelsOutlined,
  Icons.Groups,
  Icons.BotOutlined,
  Icons.EditChatsOutlined,
];

const SideBarList = () => {
  return (
    <>
      <CustomList sx={{ width: "20%" }}>
        {sidebarList.map(({ Icon }, index) => {
          return (
            //TODO: Flex list Item
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
              <Icon />
            </CustomListItem>
          );
        })}
      </CustomList>
    </>
  );
};

export default SideBarList;
