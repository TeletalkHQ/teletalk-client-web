import { Box, Avatar, TextField, Typography, Container } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

const SignIn = ({ phoneNumber, onPhoneNumberChange, onSignInClick, loading }) => {
	return (
		<Container maxWidth="xl">
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
				<Container maxWidth="xs">
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
							InputLabelProps={{ shrink: true }}
							InputProps={{
								onBlur: (e) => e.target.focus(),
								sx: { borderRadius: "10px" },
							}}
							value={phoneNumber}
							onChange={onPhoneNumberChange}
						/>

						{/* <LoadingButton
							onClick={onSignInClick}
							size="large"
							fullWidth
							sx={{ mt: 3, mb: 2, borderRadius: "10px" }}
							loading={loading}
							loadingIndicator="Please wait..."
							variant="contained"
							loadingPosition="end"
							endIcon={<Save />}
						>
							Next
						</LoadingButton> */}

						<LoadingButton
							fullWidth
							loading={loading}
							// loadingPosition="start"
							onClick={onSignInClick}
							size="large"
							// startIcon={<Fingerprint />}
							sx={{ mt: 3, mb: 2, borderRadius: "10px" }}
							variant="contained"
						>
							Next
						</LoadingButton>
					</Box>
				</Container>
			</Box>
		</Container>
	);
};

export default SignIn;
