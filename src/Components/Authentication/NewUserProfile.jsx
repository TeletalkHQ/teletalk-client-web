import { Box, Container, TextField } from "@mui/material";

const NewUserProfile = () => {
	return (
		<Container maxWidth="xl">
			<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
				<Container maxWidth="xs">
					<Box sx={{ mt: 1 }}>
						<TextField label="First Name" />
						<TextField label="Last Name" />
					</Box>
				</Container>
			</div>
		</Container>
	);
};

export default NewUserProfile;
