import { useEffect, useMemo } from "react";

import { useSnackbar } from "notistack";

import Auth from "~/Components/Authentication/Auth";
import MainBox from "~/Components/Others/MainBox";
import PortalContainer from "~/Components/Portals/PortalContainer";

import { snackbarInjector } from "~/Functions/Others/Injectors/snackbarInjector";
import { useMyContext } from "~/Hooks/useMyContext";

import { userStatusCheckerCRL } from "~/Controllers/AuthControllers/userStatusCheckerCRL";

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
			if (state.auth.user.privateID) {
				dispatch(userStatusCheckerCRL());
			}
		} catch (error) {
			console.log("MainContainer auth catch", error);
		} finally {
			dispatch({ type: "BACKDROP_STATE_CHANGE", payload: { open: false } });
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
