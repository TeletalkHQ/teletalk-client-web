import { customTypeof } from "custom-typeof";

import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

import { appConfigs } from "~/classes/AppConfigs";

import Dialog from "~/components/dialog/Dialog";
import DialogActions from "~/components/dialog/DialogActions";
import DialogContent from "~/components/dialog/DialogContent";
import DialogTitle from "~/components/dialog/DialogTitle";
import { Transitions } from "~/components/other/Transitions";

import { componentBuilder } from "~/classes/ComponentBuilder";

const DialogTemplate = componentBuilder
  .create()
  .registerComponent(
    "DialogTemplate",
    ({
      actions,
      content,
      dialogStyle,
      onClose,
      onKeyDown,
      open,
      paperStyle,
      title,
      TransitionComponent,
      transitionDuration,
    }) => {
      const theme = useTheme();

      const defaultTransitionComponentType =
        appConfigs.getConfigs().ui.defaultDialogTransitionalComponentType;

      const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

      const Transition =
        Transitions[TransitionComponent] ||
        Transitions[defaultTransitionComponentType];

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
    }
  )
  .build();

export default DialogTemplate;
