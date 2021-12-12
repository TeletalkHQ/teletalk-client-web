import { useEffect } from "react";

import { Box, Avatar, Button, TextField, Typography, Container } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Copyright from "~/Components/Utils/Copyright";

import { signInCRL } from "~/Functions/Controllers/AuthControllers/signInCRL";
import { useMyContext } from "~/Functions/Hooks/useMyContext";
import { appDispatch } from "~/Functions/Others/Injectors/dispatchInjector";

import { welcomeAPI } from "~/APIs/Others/welcomeAPI";

const theme = createTheme();

const SignIn = () => {
	const { state } = useMyContext();

	const handleSignInClick = () => {
		signInCRL({ cellphone: state.cellphone });
	};

	useEffect(() => {
		(async () => {
			const response = await welcomeAPI();

			appDispatch({ type: "sign", payload: response.data });
		})();
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<Container maxWidth="lg">
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<LockOutlined />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<Box sx={{ mt: 1 }}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="phoneNumber"
							label="Your phone number"
							name="phoneNumber"
							autoComplete="tel-national"
							autoFocus
							value={state?.phoneNumber}
							onChange={(e) => {
								appDispatch({ type: "phoneNumberInput", payload: e.target.value });
							}}
						/>

						<Button
							onClick={handleSignInClick}
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign In
						</Button>
					</Box>
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
		</ThemeProvider>
	);
};

export default SignIn;
