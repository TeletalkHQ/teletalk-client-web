import { ListItemButton as MuiListItemButton } from "@mui/material";

const ListItemButton = ({ onClick, selected, ...rest }) => {
  return <MuiListItemButton onClick={onClick} selected={selected} {...rest} />;
};

export default ListItemButton;
