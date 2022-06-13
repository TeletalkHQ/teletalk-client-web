import { AccountCircleOutlined, ArrowBack, Check } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

const NewUserProfile = ({
  firstNameInput,
  lastNameInput,
  onBackClick,
  onLastNameOnChange,
  onConfirmClick,
  onFirstNameOnChange,
  loading,
}) => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ mt: 1 }}>
        <IconButton onClick={onBackClick}>
          <ArrowBack />
        </IconButton>
      </Box>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box>
          <AccountCircleOutlined fontSize="large" color="primary" />
        </Box>
        <Container maxWidth="xs">
          <Typography component="p" variant="p" color="GrayText">
            Please enter this information to complete your account creation.
          </Typography>
          <TextField
            margin="dense"
            required
            fullWidth
            id="firstNameInput"
            name="firstName"
            autoFocus
            value={firstNameInput}
            onChange={onFirstNameOnChange}
            InputProps={{
              sx: { borderRadius: "10px" },
            }}
            label="First Name"
          />
          <TextField
            margin="dense"
            required
            fullWidth
            id="lastNameInput"
            name="lastName"
            value={lastNameInput}
            onChange={onLastNameOnChange}
            InputProps={{
              sx: { borderRadius: "10px" },
            }}
            label="Last Name"
          />

          <LoadingButton
            fullWidth
            loading={loading}
            loadingPosition="end"
            onClick={onConfirmClick}
            size="large"
            endIcon={<Check />}
            sx={{ mt: 1, borderRadius: "10px" }}
            variant="contained"
          >
            Confirm
          </LoadingButton>
        </Container>
      </Box>
    </Container>
  );
};

export default NewUserProfile;
