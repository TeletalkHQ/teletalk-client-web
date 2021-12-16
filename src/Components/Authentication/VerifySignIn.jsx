import { Avatar, Box, Container, IconButton, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { VerifiedUser, ArrowBack, Fingerprint } from "@mui/icons-material";

const VerifySignIn = ({
	countryCode,
	onBackClick,
	onVerifyClick,
	onVerifyCodeChange,
	phoneNumber,
	verifyCode,
	loading,
}) => {
	return (
		<Container maxWidth="xl">
			<Box sx={{ mt: 1 }}>
				<IconButton onClick={onBackClick}>
					<ArrowBack />
				</IconButton>
			</Box>
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: "secondary.secondary" }}>
					<VerifiedUser />
				</Avatar>
				<Container maxWidth="xs">
					<Box sx={{ mt: 1 }}>
						<Typography
							component="h5"
							variant="h5"
							sx={{ textAlign: "center", fontWeight: "900" }}
						>
							+{countryCode} {phoneNumber}
						</Typography>
						<Typography component="p" variant="p" color="GrayText">
							We've sent the code to the Teletalk app on your other device.
						</Typography>
						<TextField
							sx={{ borderRadius: "10px" }}
							margin="normal"
							required
							fullWidth
							id="phoneNumber"
							label="Verification code"
							name="verifyCode"
							autoFocus
							value={verifyCode}
							onChange={onVerifyCodeChange}
							InputLabelProps={{ shrink: true }}
							InputProps={{
								onBlur: (e) => e.target.focus(),
								sx: { borderRadius: "10px" },
							}}
						/>

						{/* <LoadingButton
							onClick={onVerifyClick}
							size="large"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2, borderRadius: "10px" }}
							loading={loading}
							loadingIndicator="Please wait..."
							loadingPosition="end"
							endIcon={<Send />}
						>
							Next
						</LoadingButton> */}
						<LoadingButton
							color="secondary"
							fullWidth
							loading={loading}
							loadingPosition="start"
							onClick={onVerifyClick}
							size="large"
							startIcon={<Fingerprint />}
							sx={{ mt: 3, mb: 2, borderRadius: "10px" }}
							variant="contained"
						>
							Verify
						</LoadingButton>
					</Box>
				</Container>
			</Box>
		</Container>
	);
};

export default VerifySignIn;
