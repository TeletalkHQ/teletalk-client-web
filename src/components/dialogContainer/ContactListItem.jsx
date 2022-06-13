import { Avatar, Box, ListItem } from "@mui/material";

const ContactListItem = ({ name, lastSeen = "", onContactClick }) => {
  return (
    <ListItem
      button
      sx={{
        display: "flex",
        height: "65px",
      }}
      onClick={onContactClick}
    >
      <Box>
        <Avatar />
      </Box>
      <Box ml={1} display="flex" sx={{ width: "100%" }} flexDirection="column">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>{name}</Box>
          {/* <Box>clock</Box> */}
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>{lastSeen}</Box>
          {/* <Box>icons</Box> */}
        </Box>
      </Box>
    </ListItem>
  );
};

export default ContactListItem;
