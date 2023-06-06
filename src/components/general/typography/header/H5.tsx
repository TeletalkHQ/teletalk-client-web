import { TypographyProps } from "@mui/material";

import Typography from "~/components/general/typography/Typography";

interface Props extends TypographyProps {
  v?: TypographyProps["variant"];
  ta?: TypographyProps["textAlign"];
  fw?: TypographyProps["fontWeight"];
}

const H5: React.FC<Props> = ({
  fontWeight,
  fw,
  ta,
  textAlign,
  v,
  variant,
  ...rest
}) => {
  return (
    <Typography
      {...rest}
      variant={v || variant || "h5"}
      sx={{
        fontWeight: fw || fontWeight || "900",
        textAlign: ta || textAlign || "center",
      }}
    />
  );
};

export default H5;
