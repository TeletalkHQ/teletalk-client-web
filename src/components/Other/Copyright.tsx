import { TypographyProps } from "@mui/material";

import { appConfigs } from "~/classes/AppConfigs";

import { BaseComponent } from "../Base";

interface Props extends TypographyProps {}

const Copyright: React.FC<Props> = (props) => {
  return (
    <BaseComponent.Typography.Base
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <BaseComponent.Box.Link
        color="inherit"
        href={appConfigs.getConfigs().api.clientBaseUrl}
      >
        teletalk
      </BaseComponent.Box.Link>

      {new Date().getFullYear()}
    </BaseComponent.Typography.Base>
  );
};

export default Copyright;
