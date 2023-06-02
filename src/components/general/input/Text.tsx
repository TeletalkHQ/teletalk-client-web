import { TextField, TextFieldProps } from "@mui/material";

interface Props extends Omit<TextFieldProps, ""> {
  m?: TextFieldProps["margin"];
}

const Text: React.FC<Props> = ({ m, ...rest }) => {
  return (
    <TextField
      margin={m || rest.margin || "dense"}
      fullWidth
      {...rest}
      InputProps={{
        ...rest.InputProps,
        sx: { borderRadius: "10px", ...(rest.InputProps?.sx || {}) },
      }}
    />
  );
};

export default Text;
