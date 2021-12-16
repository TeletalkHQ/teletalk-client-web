import { CssBaseline } from "@mui/material";

import Auth from "~/Components/Authentication/Auth";

import { useMyContext } from "~/Functions/Hooks/useMyContext";

const MainContainer = () => {
	const { state } = useMyContext();
	return (
		<>
			<CssBaseline />
			{!state.auth.user.privateID ? <Auth /> : <div>Hi!</div>}
		</>
	);
};

export default MainContainer;
