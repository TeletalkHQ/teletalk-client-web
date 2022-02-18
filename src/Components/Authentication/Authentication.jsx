import { useEffect } from "react";

import Copyright from "~/Components/Utils/Copyright";
import NewUserProfile from "~/Components/Authentication/NewUserProfile";
import SignIn from "~/Components/Authentication/SignIn";
import VerifySignIn from "~/Components/Authentication/VerifySignIn";

import { useMyContext } from "~/Hooks/useMyContext";

import { getCountriesCRL } from "~/Controllers/AuthControllers/getCountriesCRL";
import { signInCRL } from "~/Controllers/AuthControllers/signInCRL";
import { verifySignInCRL } from "~/Controllers/AuthControllers/verifySignInCRL";
import { welcomeCRL } from "~/Controllers/otherControllers/welcomeCRL";

import {
	phoneNumberAction,
	verifyCodeAction,
	countryCodeAction,
	countryNameAction,
} from "~/Actions/UserActions/userActions";
import { viewModeAction } from "~/Actions/GlobalActions/globalActions";

import { initialViewMode } from "~/Variables/Constants/Initials/InitialValues/initialValues";
import { selectedCountryAction } from "~/Actions/OtherActions/otherActions";

const numberRegex = new RegExp("^[0-9]+$");

const Authentication = () => {
	const {
		state: {
			user: { phoneNumber, countryCode, countryName, verifyCode, loading },
			global: { viewMode },
			other: { countries, countryNameInputValue, selectedCountry },
		},
		hooksOutput: { dispatch },
	} = useMyContext();

	useEffect(() => {
		dispatch(welcomeCRL());
		dispatch(getCountriesCRL());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSignInClick = () => {
		dispatch(signInCRL());
	};

	const handleVerifyClick = () => {
		dispatch(verifySignInCRL());
	};

	const handlePhoneNumberChange = (event) => {
		const value = event.target.value;

		(value?.length < 15 || value === "") &&
			dispatch(phoneNumberAction({ phoneNumber: value }));
	};

	const handleCountryCodeChange = (event) => {
		const value = event.target.value;
		const isNumber = numberRegex.test(value);

		if ((isNumber && value?.length < 6) || value === "") {
			dispatch(countryCodeAction({ countryCode: value }));
			const country = countries.find((c) => c.countryCode === value) || null;
			dispatch(selectedCountryAction({ selectedCountry: country }));
		}
	};

	const handleVerifyCodeChange = (e) => {
		const value = e?.target?.value;

		(value?.length < 6 || value === "") && dispatch(verifyCodeAction({ verifyCode: value }));
	};

	const handleBackClick = () => {
		dispatch(viewModeAction({ viewMode: initialViewMode.signIn }));
	};

	const handleCountryNameOnchange = (newValue) => {
		dispatch(selectedCountryAction({ selectedCountry: newValue || null }));
		dispatch(countryCodeAction({ countryCode: newValue?.countryCode || "" }));
		dispatch(countryNameAction({ countryName: newValue?.countryName || "" }));
	};

	const handleCountryNameOnInputChange = (newInputValue) => {
		console.log(newInputValue);
		dispatch(countryNameAction({ countryName: newInputValue }));
	};

	const component = (() => {
		switch (viewMode) {
			case initialViewMode.signIn:
				return (
					<SignIn
						countries={countries}
						countryCode={countryCode}
						loading={loading}
						onCountryCodeChange={handleCountryCodeChange}
						onPhoneNumberChange={handlePhoneNumberChange}
						onSignInClick={handleSignInClick}
						phoneNumber={phoneNumber}
						countryName={countryName}
						countryNameInputValue={countryNameInputValue}
						onCountryNameOnchange={handleCountryNameOnchange}
						onCountryNameOnInputChange={handleCountryNameOnInputChange}
						selectedCountry={selectedCountry}
					/>
				);

			case initialViewMode.newUserProfile:
				return (
					<NewUserProfile
						countries={countries}
						loading={loading}
						onPhoneNumberChange={handlePhoneNumberChange}
						onSignInClick={handleSignInClick}
						phoneNumber={phoneNumber}
					/>
				);

			case initialViewMode.verifySignIn:
				return (
					<VerifySignIn
						countryCode={countryCode}
						onBackClick={handleBackClick}
						onVerifyClick={handleVerifyClick}
						onVerifyCodeChange={handleVerifyCodeChange}
						verifyCode={verifyCode}
						phoneNumber={phoneNumber}
						loading={loading}
					/>
				);

			default:
				break;
		}
	})();

	return (
		<>
			{component}
			<Copyright sx={{ mt: 8, mb: 4 }} />
		</>
	);
};

export default Authentication;
