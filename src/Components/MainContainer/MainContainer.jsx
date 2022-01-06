import { useEffect, useMemo } from "react";

import { Grid } from "@mui/material";
import { useSnackbar } from "notistack";

import ChatContainer from "~/Components/ChatContainer/ChatContainer";
import MessageContainer from "~/Components/MessageContainer/MessageContainer";
import PortalContainer from "~/Components/Portal/PortalContainer";
import Auth from "~/Components/Authentication/Auth";

import { snackbarInjector } from "~/Functions/Others/Injectors/snackbarInjector";

import { useMyContext } from "~/Hooks/useMyContext";

import { userStatusCheckerCRL } from "~/Controllers/AuthControllers/userStatusCheckerCRL";

import {
	onlineConnectionChecker,
	onlineConnectionCheckerClearTimeout,
} from "~/Functions/eventListeners/onlineConnectionsChecker";

import { globalActions } from "~/Variables/constants/Initials/initialActions";

const { backdropAction } = globalActions;

const MainContainer = () => {
	const {
		state: {
			auth: { userState },
			other: { onlineStatusCondition, onlineStatus },
		},
		hooksOutput: { dispatch },
	} = useMyContext();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	useEffect(() => {
		onlineConnectionChecker();

		return () => {
			onlineConnectionCheckerClearTimeout();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useMemo(
		() => snackbarInjector({ enqueueSnackbar, closeSnackbar }),
		[enqueueSnackbar, closeSnackbar],
	);

	useEffect(() => {
		try {
			if (userState.privateID) {
				dispatch(userStatusCheckerCRL());
			}
		} catch (error) {
			console.log("MainContainer auth catch", error);
		} finally {
			dispatch({ type: backdropAction.type, payload: { open: false } });
		}
		// eslint-disable-next-line
	}, [userState.mainToken]);

	return (
		<>
			{!userState.privateID ? (
				<Auth />
			) : (
				<>
					<Grid container style={{ height: "100vh" }}>
						<Grid sx={{ backgroundColor: "lightcyan" }} item container sm={12} md={4} lg={3}>
							<ChatContainer />
						</Grid>

						<Grid sx={{ backgroundColor: "tomato" }} item container lg={9} md={8}>
							<MessageContainer />
						</Grid>
					</Grid>
				</>
			)}

			<PortalContainer />
		</>
	);
};

export default MainContainer;
