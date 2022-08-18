import { useTheme } from "@mui/material/styles";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import { customTypeof } from "classes/CustomTypeof";
import { appConfigs } from "classes/AppConfigs";
import { appOptions } from "classes/AppOptions";

const DialogTemplate = ({
  actionContent,
  dialogContent,
  dialogStyle,
  onClose,
  onKeyDown,
  open,
  paperStyle,
  titleContent,
  TransitionComponent = appConfigs.getConfigs().ui
    .dialogTransitionalComponentType,
  transitionDuration,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { [TransitionComponent]: Transition } =
    appOptions.getOptions().ui.transitions;

  return (
    <Dialog
      fullScreen={fullScreen}
      keepMounted
      {...(customTypeof.check(onClose).type.function && {
        onClose: () => onClose(),
      })}
      // onEscapeKeyDown={onEscapeKeyDown}
      onKeyDown={onKeyDown}
      open={open}
      PaperProps={{
        style: {
          borderRadius: !fullScreen ? "15px" : "",
          minWidth: !fullScreen ? "450px" : "auto",
          ...paperStyle,
          height: !fullScreen ? paperStyle?.height : "100vh",
        },
      }}
      sx={{ ...dialogStyle }}
      TransitionComponent={Transition}
      transitionDuration={transitionDuration || 500}
      // aria-labelledby="alert-dialog-slide-title"
      // aria-describedby="alert-dialog-slide-description"
    >
      {/* <Box sx={{}}> */}
      <DialogTitle>{titleContent}</DialogTitle>

      <DialogContent>{dialogContent}</DialogContent>

      <DialogActions>{actionContent}</DialogActions>
      {/* </Box> */}
    </Dialog>
  );
};

export default DialogTemplate;
