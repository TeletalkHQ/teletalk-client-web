import { TypographyProps } from "@mui/material";

import { appConfigs } from "~/classes/AppConfigs";
import Link from "~/components/general/other/Link";
import Typography from "~/components/general/typography/Typography";

type Props = TypographyProps;

const Copyright: React.FC<Props> = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href={appConfigs.getConfigs().api.clientBaseUrl}>
        teletalk
      </Link>

      {new Date().getFullYear()}
    </Typography>
  );
};

export default Copyright;
