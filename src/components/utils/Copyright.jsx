import { Typography, Link } from "@mui/material";

import { appConfigs } from "classes/AppConfigs";

const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href={appConfigs.configs.others.CLIENT_BASE_URL}>
        teletalk
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;
