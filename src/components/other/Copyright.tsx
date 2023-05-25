import { appConfigs } from "~/classes/AppConfigs";

import Link from "~/components/general/other/Link";
import Typography from "~/components/general/typography/Typography";

const Copyright = (props) => {
  const {
    apiConfigs: { CLIENT_BASE_URL: APPLICATION_URL },
  } = appConfigs.getConfigs();

  return (
    <Typography
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
    </Typography>
  );
};

export default Copyright;