import { useEffect, useMemo } from "react";

import { Grid } from "@mui/material";
import { useSnackbar } from "notistack";

import LeftSideContainer from "~/Components/LeftSideComponents/LeftSideContainer";
import RightSideContainer from "~/Components/RightSideComponents/RightSideContainer";
import PortalContainer from "~/Components/Portal/PortalContainer";
import Authentication from "~/Components/Authentication/Authentication";

import { useMyContext } from "~/Hooks/useMyContext";

import { userStatusCheckerCRL } from "~/Controllers/AuthControllers/userStatusCheckerCRL";
import { getUserChatsLastMessageCRL } from "~/Controllers/MessageControllers/getUserChatsLastMessageCRL";

import { snackbarInjector } from "~/Functions/Others/Injectors/snackbarInjector";
import { onlineConnectionChecker } from "~/Functions/EventListeners/onlineConnectionsChecker";

import { backdropAction } from "~/Actions/GlobalActions/globalActions";
import { INITIAL_VIEW_MODE } from "~/Variables/Constants/Initials/InitialValues/initialValues";

const MainContainer = () => {
	const {
		state: {
			user,
			temp: { selectedContact },
			global: { viewMode },
		},
		hooksOutput: { dispatch },
	} = useMyContext();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	useMemo(
		() => snackbarInjector({ enqueueSnackbar, closeSnackbar }),
		[enqueueSnackbar, closeSnackbar],
	);

	useEffect(() => {
		onlineConnectionChecker();
	}, []);

	useEffect(() => {
		(async () => {
			try {
				if (user.privateID) {
					const { user } = await dispatch(userStatusCheckerCRL());

					await dispatch(getUserChatsLastMessageCRL({ user }));
				}
			} catch (error) {
				console.log("MainContainer auth catch", error);
			} finally {
				dispatch(backdropAction({ backdropState: { open: false } }));
			}
		})();
		// eslint-disable-next-line
	}, [user.mainToken]);

	return (
		<>
			{!user.privateID || viewMode !== INITIAL_VIEW_MODE.messenger ? (
				<Authentication />
			) : (
				<>
					<Grid container style={{ height: "100vh" }}>
						<Grid sx={{ backgroundColor: "lightcyan" }} item container sm={12} md={4} lg={3}>
							<LeftSideContainer />
						</Grid>

						<Grid
							sx={{ backgroundColor: "tomato", height: "100%" }}
							item
							container
							lg={9}
							md={8}
						>
							{selectedContact.privateID && <RightSideContainer />}
						</Grid>
					</Grid>
				</>
			)}

			<PortalContainer />
		</>
	);
};

export default MainContainer;
