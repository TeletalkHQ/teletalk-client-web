import ListItemIcon from "src/components/general/other/ListItemIcon";
import { Box } from "src/components/general/box";
import { Icons } from "src/components/other/Icons";

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
  <Box.List>
    {drawerList.map(({ elementName, Icon, text }, index) => (
      <Box.ListItem
        button
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
      </Box.ListItem>
    ))}
  </Box.List>
);

export default DrawerList;
