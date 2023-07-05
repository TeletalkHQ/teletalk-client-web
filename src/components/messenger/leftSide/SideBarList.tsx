import Box from "~/components/general/box";
import { Icons } from "~/components/other/Icons";

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
            <Box.ListItemButton
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
            </Box.ListItemButton>
          );
        })}
      </Box.List>
    </>
  );
};

export default SideBarList;
