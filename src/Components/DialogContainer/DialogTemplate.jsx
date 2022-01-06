import { useTheme } from "@mui/material/styles";
import {
	Dialog,
	dialogInitialActions,
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
	noOnClose,
	onClose,
	onEscapeKeyDown,
	onKeyDown,
	paperStyle,
	target,
	titleContent,
	TransitionComponent = "Grow",
	transitionDuration,
}) => {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

	const { [TransitionComponent]: Transition } = transitions;

	return (
		<Dialog
			fullScreen={fullScreen}
			keepMounted
			{...(!noOnClose && { onClose: () => onClose(target.dialogName) })}
			// onEscapeKeyDown={onEscapeKeyDown}
			onKeyDown={onKeyDown}
			open={target.open}
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

			<dialogInitialActions>{actionContent}</dialogInitialActions>
			{/* </Box> */}
		</Dialog>
	);
};

export default DialogTemplate;
