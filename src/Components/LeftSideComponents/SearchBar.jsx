import { Box, IconButton, TextField, InputAdornment } from "@mui/material";

import { initialValues } from "~/Variables/Constants/Initials/InitialValues/initialValues";

const { menu, search } = initialValues;

const SearchBar = ({ onDrawerIconClick }) => {
	return (
		<>
			<Box>
				<IconButton onClick={onDrawerIconClick}>
					<menu.Icon />
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
								<search.Icon />
							</InputAdornment>
						),
					}}
				/>
			</Box>
		</>
	);
};

export default SearchBar;
