import { Box } from "src/components/general/box";

import { Icons } from "src/components/other/Icons";

const sidebarList = [
  Icons.AllChatsOutlined,
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
      <Box.List sx={{ width: "20%" }}>
        {sidebarList.map(({ Icon }, index) => {
          return (
            //TODO: Flex list Item
            <Box.ListItem
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
            </Box.ListItem>
          );
        })}
      </Box.List>
    </>
  );
};

export default SideBarList;
