import { useMemo } from "react";
import { useSnackbar } from "notistack";

import Auth from "~/Components/Authentication/Auth";

import { useMyContext } from "~/Functions/Hooks/useMyContext";
import MainBox from "~/Components/Others/MainBox";
import PortalContainer from "~/Components/Portals/PortalContainer";
import { snackbarInjector } from "~/Functions/Others/Injectors/snackbarInjector";

const MainContainer = () => {
	const { state } = useMyContext();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	useMemo(
		() => snackbarInjector({ enqueueSnackbar, closeSnackbar }),
		[enqueueSnackbar, closeSnackbar],
	);

	return (
		<>
			{!state.auth.user.privateID ? <Auth /> : <MainBox>Hi!</MainBox>}

			<PortalContainer state={state} />
		</>
	);
};

export default MainContainer;
