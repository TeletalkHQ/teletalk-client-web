import { Grid, Paper, Slide, Typography } from "@mui/material";

const MessageListItem = ({
	message,
	messageTime,
	chatDate,
	justify,
	messageItemContainerClassName,
	messageItemClassName,
	direction,
}) => {
	return (
		<>
			<Grid container justify={justify} className={messageItemContainerClassName}>
				<Slide direction={direction} in={true} mountOnEnter unmountOnExit>
					<Paper
						className={`${messageItemClassName}`}
						elevation={1}
						// onContextMenu={(e) => onOtherStateChange(e)}
					>
						<Typography style={{ wordBreak: "break-word" }}>{message}</Typography>
						<Typography style={{ fontSize: "13px", float: "right" }}>
							{messageTime} {chatDate}
						</Typography>
					</Paper>
				</Slide>
			</Grid>
		</>
	);
};

export default MessageListItem;
