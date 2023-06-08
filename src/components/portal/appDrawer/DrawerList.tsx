import ListItemIcon from "~/components/general/other/ListItemIcon";
import Box from "~/components/general/box";
import { Icons } from "~/components/other/Icons";

import { ElementName, HTMLDivMouseEvent } from "~/types";

const drawerList = [
  Icons.Calls,
  Icons.Contacts,
  Icons.LogoutOutlined,
  Icons.NewChannelOutlined,
  Icons.NewGroupOutlined,
  Icons.NightModeOutlined,
  Icons.SettingsOutlined,
];

interface Props {
  toggleDrawer: (event: HTMLDivMouseEvent, open: boolean) => void;
  onClick: (elName: ElementName) => void;
}

const DrawerList: React.FC<Props> = ({ toggleDrawer, onClick }) => (
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
          onClick(elementName);
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
