import { useEffect } from "react";

import { Box, Avatar, Button, TextField, Typography, Container } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Copyright from "~/Components/Utils/Copyright";

import { appDispatch } from "~/Functions/Others/Injectors/dispatchInjector";
import { useMyContext } from "~/Functions/Hooks/useMyContext";

import { welcomeAPI } from "~/APIs/Others/welcomeAPI";

const theme = createTheme();

export default function SignIn() {
	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		console.log({
			email: data.get("email"),
			password: data.get("password"),
		});
	};

	const { state } = useMyContext();

	useEffect(() => {
		(async () => {
			const response = await welcomeAPI();

			appDispatch({ type: "sign", payload: response.data });
		})();
	}, []);

	console.log(state);

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
					<Box onSubmit={handleSubmit} sx={{ mt: 1 }}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							value={state?.cellphone}
							onChange={(e) => {
								appDispatch({ type: "cellphoneInput", payload: e.target.value });
							}}
						/>

						<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
							Sign In
						</Button>
					</Box>
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
		</ThemeProvider>
	);
}
