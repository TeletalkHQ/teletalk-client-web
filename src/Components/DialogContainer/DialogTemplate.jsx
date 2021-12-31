import { Dialog, DialogActions, DialogContent, DialogTitle, Grow } from "@mui/material";

const transitions = { Grow };

const DialogTemplate = ({
	titleContent,
	actionContent,
	dialogContent,
	noOnClose,
	open,
	TransitionComponent = "Grow",
	transitionDuration,
	onClose,
	onEscapeKeyDown,
	onKeyDown,
}) => {
	const { [TransitionComponent]: Transition } = transitions;

	return (
		<Dialog
			onEscapeKeyDown={onEscapeKeyDown}
			onKeyDown={onKeyDown}
			open={!!open}
			PaperProps={{ style: { borderRadius: "15px" } }}
			TransitionComponent={Transition}
			keepMounted
			transitionDuration={transitionDuration || 500}
			{...(!noOnClose && { onClose })}
			// aria-labelledby="alert-dialog-slide-title"
			// aria-describedby="alert-dialog-slide-description"
		>
			<>
				<DialogTitle id="draggable-dialog-title">{titleContent}</DialogTitle>

				<DialogContent>{dialogContent}</DialogContent>

				<DialogActions>{actionContent}</DialogActions>
			</>
		</Dialog>
	);
};

export default DialogTemplate;
