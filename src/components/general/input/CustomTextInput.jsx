import { TextField } from "@mui/material";

const CustomTextInput = ({ InputProps, margin, m, ...props }) => {
  const inputPropsSx = InputProps?.sx || {};

  const textFieldMargin = margin || m || "dense";
  return (
    <TextField
      margin={textFieldMargin}
      fullWidth
      {...props}
      InputProps={{
        ...InputProps,
        sx: { borderRadius: "10px", ...inputPropsSx },
      }}
    />
  );
};

export default CustomTextInput;
