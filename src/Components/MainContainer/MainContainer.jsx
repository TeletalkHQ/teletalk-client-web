import { useEffect, useMemo } from "react";

import { Grid } from "@mui/material";
import { useSnackbar } from "notistack";

import ChatContainer from "~/Components/ChatContainer/ChatContainer";
import MessageContainer from "~/Components/MessageContainer/MessageContainer";
import PortalContainer from "~/Components/Portal/PortalContainer";
import Auth from "~/Components/Authentication/Auth";

import { useMyContext } from "~/Hooks/useMyContext";

import { userStatusCheckerCRL } from "~/Controllers/AuthControllers/userStatusCheckerCRL";
import { getUserChatsLastMessageCRL } from "~/Controllers/MessageControllers/getUserChatsLastMessageCRL";

import { snackbarInjector } from "~/Functions/Others/Injectors/snackbarInjector";
import {
	onlineConnectionChecker,
	onlineConnectionCheckerClearTimeout,
} from "~/Functions/EventListeners/onlineConnectionsChecker";

import { backdropAction } from "~/Actions/GlobalActions/globalActions";

const MainContainer = () => {
	const {
		state: {
			user,
			temp: { selectedContact },
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

		return () => {
			onlineConnectionCheckerClearTimeout();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
			{!user.privateID ? (
				<Auth />
			) : (
				<>
					<Grid container style={{ height: "100vh" }}>
						<Grid sx={{ backgroundColor: "lightcyan" }} item container sm={12} md={4} lg={3}>
							<ChatContainer />
						</Grid>

						<Grid
							sx={{ backgroundColor: "tomato", height: "100%" }}
							item
							container
							lg={9}
							md={8}
						>
							{selectedContact.privateID && <MessageContainer />}
						</Grid>
					</Grid>
				</>
			)}

			<PortalContainer />
		</>
	);
};

export default MainContainer;
