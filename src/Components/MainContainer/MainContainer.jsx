import { CssBaseline } from "@mui/material";

import Auth from "~/Components/Authentication/Auth";

import { useMyContext } from "~/Functions/Hooks/useMyContext";
import MainBox from "~/Components/Others/MainBox";

const MainContainer = () => {
	const { state } = useMyContext();

	return (
		<>
			<CssBaseline />
			{!state.auth.user.privateID ? <Auth /> : <MainBox>Hi!</MainBox>}
		</>
	);
};

export default MainContainer;
