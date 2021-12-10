import { baseURL } from "~/Variables/constants/requestConstants";
import { Typography, Link } from "@mui/material";

const Copyright = (props) => {
	return (
		<Typography variant="body2" color="text.secondary" align="center" {...props}>
			{"Copyright © "}
			<Link color="inherit" href={baseURL}>
				teletalk
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
};

export default Copyright;
