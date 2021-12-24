import { useEffect } from "react";

import SignIn from "~/Components/Authentication/SignIn";
import VerifySignIn from "~/Components/Authentication/VerifySignIn";
import Copyright from "~/Components/Utils/Copyright";

import { signInCRL } from "~/Controllers/AuthControllers/signInCRL";
import { verifySignInCRL } from "~/Controllers/AuthControllers/verifySignInCRL";
import { welcomeCRL } from "~/Controllers/otherControllers/welcomeCRL";
import { useMyContext } from "~/Hooks/useMyContext";
import { appDispatch } from "~/Functions/Others/Injectors/dispatchInjector";

const Auth = () => {
	const {
		state: {
			auth: {
				user: {
					cellphone: { phoneNumber, countryCode },
					verifyCode,
				},
				loading,
			},
			global: { viewMode },
		},
	} = useMyContext();

	useEffect(() => {
		appDispatch(welcomeCRL());
	}, []);

	const handleSignInClick = () => {
		appDispatch(signInCRL());
	};

	const handlePhoneNumberChange = (e) => {
		appDispatch({ type: "PHONE_NUMBER_ONCHANGE", payload: e.target.value });
	};

	const handleVerifyClick = () => {
		appDispatch(verifySignInCRL());
	};

	const handleVerifyCodeChange = (e) => {
		const value = e?.target?.value;

		if (value?.length > 6) return;

		appDispatch({ type: "VERIFY_CODE_ONCHANGE", payload: value });
	};

	const handleBackClick = () => {
		appDispatch({ type: "VIEW_MODE_ONCHANGE", payload: "signIn" });
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
