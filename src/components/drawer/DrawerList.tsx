import Box from "~/components/general/box";
import ListItemIcon from "~/components/general/other/ListItemIcon";
import { Icons } from "~/components/other/Icons";
import { ElementName, HTMLDivMouseEvent } from "~/types";

const drawerList = [
  { ...Icons.Calls, disabled: true },
  { ...Icons.Contacts, disabled: false },
  { ...Icons.LogoutOutlined, disabled: false },
  { ...Icons.NewChannelOutlined, disabled: true },
  { ...Icons.NewGroupOutlined, disabled: true },
  { ...Icons.NightModeOutlined, disabled: true },
  { ...Icons.SettingsOutlined, disabled: false },
];

interface Props {
  toggleDrawer: (event: HTMLDivMouseEvent, open: boolean) => void;
  onClick: (elName: ElementName) => void;
}

const DrawerList: React.FC<Props> = ({ toggleDrawer, onClick }) => (
  <Box.List style={{ padding: 10 }}>
    {drawerList.map(({ elementName, Icon, text, disabled }, index) => (
      <Box.ListItemButton
        disabled={disabled}
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
