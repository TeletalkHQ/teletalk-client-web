import { useEffect, useMemo } from "react";

import {
	Box,
	Grid,
	IconButton,
	InputAdornment,
	TextField,
	Avatar,
	List,
	ListItem,
} from "@mui/material";

import {
	Menu as MenuIcon,
	Search as SearchIcon,
	ForumOutlined,
	PersonOutlineOutlined,
	GroupOutlined,
	CampaignOutlined,
	SmartToyOutlined,
	AnnouncementOutlined,
	SettingsApplicationsOutlined,
	SettingsInputComponentOutlined,
} from "@mui/icons-material";

import { useSnackbar } from "notistack";

import Auth from "~/Components/Authentication/Auth";
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
			{!state.auth.user.privateID ? (
				<Auth />
			) : (
				<>
					<Grid container style={{ height: "100vh" }}>
						<Grid sx={{ backgroundColor: "lightcyan" }} item container sm={12} md={4} lg={3}>
							<Box display="flex" flexDirection="column" style={{ width: "100%" }}>
								<Box display="flex" justifyContent="space-between" alignItems="center">
									<Box>
										<IconButton
											onClick={() =>
												dispatch({
													type: "APP_DRAWER_STATE_CHANGE",
													payload: {
														anchor: state.global.appDrawerState.currentAnchor,
														open: true,
													},
												})
											}
										>
											<MenuIcon />
										</IconButton>
									</Box>
									<Box p={1} sx={{ width: "100%" }}>
										<TextField
											fullWidth
											size="small"
											placeholder="Search"
											InputProps={{
												sx: {
													borderRadius: "10px",
												},
												startAdornment: (
													<InputAdornment position="start">
														<SearchIcon />
													</InputAdornment>
												),
											}}
										/>
									</Box>
								</Box>
								<Box display="flex" justifyContent="space-between">
									<List sx={{ width: "20%" }}>
										{[
											ForumOutlined,
											PersonOutlineOutlined,
											GroupOutlined,
											CampaignOutlined,
											SmartToyOutlined,
											AnnouncementOutlined,
											SettingsInputComponentOutlined,
										].map((Item, index) => {
											return (
												<>
													<ListItem
														button
														selected={index === 4}
														sx={{
															display: "flex",
															flexDirection: "column",
															height: "65px",
															justifyContent: "center",
															alignItems: "center",
														}}
													>
														<Item
														// fontSize="small"
														/>
													</ListItem>
												</>
											);
										})}
									</List>
									<List sx={{ width: "80%" }}>
										{Array.from({ length: 5 }).map((item, index) => {
											return (
												<ListItem
													key={index}
													button
													selected={index === 3}
													sx={{
														display: "flex",
														height: "65px",
													}}
												>
													<Box>
														<Avatar />
													</Box>
													<Box display="flex" sx={{ width: "100%" }} flexDirection="column">
														<Box
															display="flex"
															justifyContent="space-between"
															alignItems="center"
														>
															<Box>name</Box>
															<Box>clock</Box>
														</Box>
														<Box
															display="flex"
															justifyContent="space-between"
															alignItems="center"
														>
															<Box>message</Box>
															<Box>icons</Box>
														</Box>
													</Box>
												</ListItem>
											);
										})}
									</List>
								</Box>
							</Box>
						</Grid>
						<Grid sx={{ backgroundColor: "tomato" }} item container lg={9} md={8}>
							Hi! Im messageListContainer!
						</Grid>
					</Grid>
				</>
			)}

			<PortalContainer state={state} />
		</>
	);
};

export default MainContainer;
