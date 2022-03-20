import { Typography, Link } from "@mui/material";

import { BASE_URL } from "~/Variables/Constants/Others/otherConstants";

const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href={BASE_URL}>
        teletalk
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;
