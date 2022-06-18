import { Typography, Link } from "@mui/material";

import { CLIENT_BASE_URL } from "variables/others/otherConstants";

const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href={CLIENT_BASE_URL}>
        teletalk
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;
