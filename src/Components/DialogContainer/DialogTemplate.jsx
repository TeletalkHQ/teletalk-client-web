import { useTheme } from "@mui/material/styles";
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grow,
	useMediaQuery,
} from "@mui/material";

const transitions = { Grow };

const DialogTemplate = ({
	actionContent,
	dialogContent,
	dialogStyle,
	onClose,
	// onEscapeKeyDown,
	onKeyDown,
	open,
	paperStyle,
	titleContent,
	TransitionComponent = "Grow", //TODO Read from initial value
	transitionDuration,
}) => {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

	const { [TransitionComponent]: Transition } = transitions;

	return (
		<Dialog
			fullScreen={fullScreen}
			keepMounted
			{...(onClose && typeof onClose === "function" && { onClose: () => onClose() })}
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
