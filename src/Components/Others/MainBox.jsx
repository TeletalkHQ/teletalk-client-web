import { Avatar, Box, Button, Container, Divider, Paper } from "@mui/material";

import { useMyContext } from "~/Functions/Hooks/useMyContext";
import { requester } from "~/Functions/Utils/requester";
import MessageInput from "../MainContainer/MessageInput";

const MainBox = () => {
	const {
		state: {
			auth: { user },
		},
	} = useMyContext();

	return (
		<>
			<Container maxWidth="xl">
				<Box sx={{ height: "100vh", width: "100%", display: "flex", alignItems: "center" }}>
					<Paper
						sx={{
							width: "100%",
							height: "95%",
							backgroundColor: "lightcyan",
							display: "flex",
							flexDirection: "column",
							justifyContent: "space-between",
						}}
						elevation={9}
					>
						<Box
							sx={{
								backgroundColor: "white",
								height: "45px",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Box>
								<Avatar />
							</Box>
							<Box>Name</Box>
						</Box>
						<Divider />
						<Box>
							{[]?.map((item) => (
								<Box
									sx={{
										padding: "5px",
										display: "flex",
										justifyContent: item.senderID === user.privateID ? "flex-end" : "flex-end",
									}}
								>
									<Paper elevation={9} sx={{ width: "300px", minHeight: "50px" }}>
										{item}
									</Paper>
								</Box>
							))}
						</Box>
						<Box>
							<MessageInput />
						</Box>
					</Paper>
				</Box>
				<Button
					onClick={() => {
						requester({
							data: {
								privateID: "dc0rlpB8xIZI2bj7-twaiLIzvnMzt8_kMEj",
							},
							url: "/chat/private/start/chat",
							method: "POST",
						});
					}}
				>
					ADD chat
				</Button>
			</Container>
		</>
	);
};

export default MainBox;
