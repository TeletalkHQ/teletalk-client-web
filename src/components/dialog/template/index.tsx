import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { customTypeof } from "custom-typeof";

import { appConfigs } from "~/classes/AppConfigs";
import Dialog from "~/components/dialog/template/Dialog";
import DialogActions from "~/components/dialog/template/DialogActions";
import DialogContent from "~/components/dialog/template/DialogContent";
import DialogTitle from "~/components/dialog/template/DialogTitle";
import { Transitions } from "~/components/other/Transitions";
import { Style, TransitionName, VoidNoArgsFn } from "~/types";

interface Props {
  actions: JSX.Element;
  content: JSX.Element;
  dialogStyle: Style;
  onClose: VoidNoArgsFn;
  onKeyDown: VoidNoArgsFn;
  open: boolean;
  paperStyle: Style;
  title: string;
  transition: TransitionName;
  transitionDuration: number;
}

const DialogTemplate: React.FC<Props> = ({
  actions,
  content,
  dialogStyle,
  onClose,
  onKeyDown,
  open,
  paperStyle,
  title,
  transition,
  transitionDuration,
}) => {
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const Transition =
    Transitions[transition] ||
    Transitions[appConfigs.getConfigs().ui.dialogDefaultTransition];

  return (
    <Dialog
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
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  );
};

export default DialogTemplate;
