import ListItemIcon from "~/components/general/other/ListItemIcon";
import Box from "~/components/general/box";

import { Icons } from "~/components/other/Icons";

const drawerList = [
  Icons.Calls,
  Icons.Contacts,
  Icons.LogoutOutlined,
  Icons.NewChannelOutlined,
  Icons.NewGroupOutlined,
  Icons.NightModeOutlined,
  Icons.SettingsOutlined,
];

const DrawerList = ({ toggleDrawer, onDrawerItemClick }) => (
  <Box.List style={{ padding: 10 }}>
    {drawerList.map(({ elementName, Icon, text }, index) => (
      <Box.ListItemButton
        style={{
          alignItems: "center",
          borderRadius: "10px",
          height: "40px",
        }}
        key={index}
        onClick={(event) => {
          toggleDrawer(event, false);
          onDrawerItemClick(elementName);
        }}
      >
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <Box.ListItemText primary={text} />
      </Box.ListItemButton>
    ))}
  </Box.List>
);

export default DrawerList;
