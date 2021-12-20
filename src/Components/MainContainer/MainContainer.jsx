import { useEffect, useMemo } from "react";

import { useSnackbar } from "notistack";

import Auth from "~/Components/Authentication/Auth";
import MainBox from "~/Components/Others/MainBox";
import PortalContainer from "~/Components/Portals/PortalContainer";

import { snackbarInjector } from "~/Functions/Others/Injectors/snackbarInjector";
import { tokenDecoder } from "~/Functions/Utils/tokenDecoder";
import { useMyContext } from "~/Functions/Hooks/useMyContext";

const MainContainer = () => {
	const {
		state,
		hooksOutput: { dispatch },
	} = useMyContext();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	useMemo(
		() => snackbarInjector({ enqueueSnackbar, closeSnackbar }),
		[enqueueSnackbar, closeSnackbar],
	);

	useEffect(() => {
		try {
			const mainToken = localStorage.getItem("mainToken");

			if (!mainToken) {
				const error = "mainToken not defined";
				throw error;
			}

			const parsedMainToken = JSON.parse(mainToken);

			if (!parsedMainToken) {
				const error = "mainToken malformed";

				throw error;
			}

			if (parsedMainToken.condition === "expired") {
				const error = "Your session expired";
				dispatch({ type: "VIEW_MODE_ONCHANGE", payload: "signIn" });

				throw error;
			}

			const { decodedToken } = tokenDecoder({ token: parsedMainToken.value });
			delete decodedToken.iat;

			dispatch({ type: "USER_DATA", payload: decodedToken });
			dispatch({ type: "BACKDROP_STATE_CHANGE", payload: { open: false } });
		} catch (error) {
			dispatch({ type: "BACKDROP_STATE_CHANGE", payload: { open: false } });

			console.log("MainContainer auth catch", error);
		}
		// eslint-disable-next-line
	}, [state.auth.user.mainToken]);

	return (
		<>
			{!state.auth.user.privateID ? <Auth /> : <MainBox>Hi!</MainBox>}

			<PortalContainer state={state} />
		</>
	);
};

export default MainContainer;
