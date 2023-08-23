import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { customTypeof } from "custom-typeof";

import { appConfigs } from "~/classes/AppConfigs";
import { BaseComponent } from "~/components/Base";
import { Style, TransitionName, VoidNoArgsFn } from "~/types";

import Actions from "./Actions";
import Content from "./Content";
import Title from "./Title";

interface Props {
  actions: JSX.Element;
  content: JSX.Element;
  dialogStyle?: Style;
  onClose?: VoidNoArgsFn;
  onKeyDown?: VoidNoArgsFn;
  open: boolean;
  paperStyle?: Style;
  title?: string | JSX.Element;
  transitionName?: TransitionName;
  transitionDuration?: number;
}

const Dialog: React.FC<Props> = ({
  actions,
  content,
  dialogStyle,
  onClose,
  onKeyDown,
  open,
  paperStyle,
  title,
  transitionName = appConfigs.getConfigs().ui.dialogDefaultTransition,
  transitionDuration,
}) => {
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const Transition =
    BaseComponent.Transition[transitionName] ||
    BaseComponent.Transition[
      appConfigs.getConfigs().ui.dialogDefaultTransition
    ];

  return (
    <BaseComponent.Box.Dialog
      fullScreen={fullScreen}
      keepMounted
      {...(customTypeof.isFunction(onClose) && {
        onClose,
      })}
      // onEscapeKeyDown={onEscapeKeyDown}
      onKeyDown={onKeyDown}
      open={open}
      PaperProps={{
        style: {
          borderRadius: fullScreen ? "" : "15px",
          minWidth: fullScreen ? "auto" : "450px",
          ...paperStyle,
          height: fullScreen ? "100vh" : paperStyle?.height,
        },
      }}
      sx={{ ...dialogStyle }}
      TransitionComponent={Transition}
      transitionDuration={transitionDuration || 500}
    >
      <Title>{title}</Title>
      <Content>{content}</Content>
      <Actions>{actions}</Actions>
    </BaseComponent.Box.Dialog>
  );
};

export default Dialog;
