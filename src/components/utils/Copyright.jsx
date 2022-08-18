import { Link } from "@mui/material";

import { appConfigs } from "classes/AppConfigs";
import CustomTypography from "components/generals/typographies/CustomTypography";

const Copyright = (props) => {
  const {
    apiConfigs: { CLIENT_BASE_URL: APPLICATION_URL },
  } = appConfigs.getConfigs();

  return (
    <CustomTypography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href={APPLICATION_URL}>
        teletalk
      </Link>
      {new Date().getFullYear()}
    </CustomTypography>
  );
};

export default Copyright;
