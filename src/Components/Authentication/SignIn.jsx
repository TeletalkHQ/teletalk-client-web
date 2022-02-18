import { Box, Avatar, TextField, Typography, Container } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

import CountrySelector from "~/Components/Others/CountrySelector";

const SignIn = ({
	countries,
	countryCode,
	countryName,
	countryNameInputValue,
	loading,
	onCountryCodeChange,
	onPhoneNumberChange,
	onCountryNameOnchange,
	onCountryNameOnInputChange,
	onSignInClick,
	phoneNumber,
	selectedCountry,
}) => {
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
						<CountrySelector
							countries={countries}
							countryName={countryName}
							countryNameInputValue={countryNameInputValue}
							onCountryNameOnchange={onCountryNameOnchange}
							onCountryNameOnInputChange={onCountryNameOnInputChange}
							selectedCountry={selectedCountry}
						/>

						<Box display="flex" justifyContent={"space-between"}>
							<TextField
								style={{ width: "90px" }}
								margin="normal"
								required
								id="countryCode"
								label="Code"
								name="countryCode"
								autoComplete="off"
								InputProps={{
									sx: { borderRadius: "10px" },
									startAdornment: (
										<>
											<span>+</span>
										</>
									),
								}}
								value={countryCode}
								onChange={onCountryCodeChange}
							/>
							<TextField
								margin="normal"
								required
								fullWidth
								id="phoneNumber"
								label="Phone number"
								name="phoneNumber"
								autoComplete="tel-national"
								style={{ marginLeft: "5px" }}
								InputProps={{
									sx: { borderRadius: "10px" },
								}}
								value={phoneNumber}
								onChange={onPhoneNumberChange}
							/>
						</Box>

						<LoadingButton
							fullWidth
							loading={loading}
							loadingIndicator="Please wait..."
							onClick={onSignInClick}
							size="large"
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
