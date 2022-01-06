import { useEffect } from "react";

import SignIn from "~/Components/Authentication/SignIn";
import VerifySignIn from "~/Components/Authentication/VerifySignIn";
import Copyright from "~/Components/Utils/Copyright";

import { useMyContext } from "~/Hooks/useMyContext";

import { signInCRL } from "~/Controllers/AuthControllers/signInCRL";
import { verifySignInCRL } from "~/Controllers/AuthControllers/verifySignInCRL";
import { welcomeCRL } from "~/Controllers/otherControllers/welcomeCRL";

import { initialViewMode } from "~/Variables/Constants/Initials/InitialValues/initialValues";
import { phoneNumberAction, verifyCodeAction } from "~/Actions/UserActions/userActions";
import { viewModeAction } from "~/Actions/GlobalActions/globalActions";

const Auth = () => {
	const {
		state: {
			user: { phoneNumber, countryCode, verifyCode, loading },
			global: { viewMode },
		},
		hooksOutput: { dispatch },
	} = useMyContext();

	useEffect(() => {
		dispatch(welcomeCRL());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSignInClick = () => {
		dispatch(signInCRL());
	};

	const handleVerifyClick = () => {
		dispatch(verifySignInCRL());
	};

	const handlePhoneNumberChange = (e) => {
		dispatch(phoneNumberAction({ phoneNumber: e.target.value }));
	};

	const handleVerifyCodeChange = (e) => {
		const value = e?.target?.value;

		if (value?.length > 6) return;

		dispatch(verifyCodeAction({ verifyCode: value }));
	};

	const handleBackClick = () => {
		dispatch(viewModeAction({ viewMode: initialViewMode.signIn }));
	};

	return (
		<>
			{viewMode === "signIn" && (
				<SignIn
					phoneNumber={phoneNumber}
					onPhoneNumberChange={handlePhoneNumberChange}
					onSignInClick={handleSignInClick}
					loading={loading}
				/>
			)}

			{viewMode === "verifySignIn" && (
				<VerifySignIn
					countryCode={countryCode}
					onBackClick={handleBackClick}
					onVerifyClick={handleVerifyClick}
					onVerifyCodeChange={handleVerifyCodeChange}
					verifyCode={verifyCode}
					phoneNumber={phoneNumber}
					loading={loading}
				/>
			)}
			<Copyright sx={{ mt: 8, mb: 4 }} />
		</>
	);
};

export default Auth;
