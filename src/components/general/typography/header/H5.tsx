import Typography from "~/components/general/typography/Typography";

const H5 = ({ fontWeight, fw, ta, textAlign, v, variant, ...restOfProps }) => {
  return (
    <Typography
      {...restOfProps}
      component="h5"
      variant={v || variant || "h5"}
      sx={{
        fontWeight: fw || fontWeight || "900",
        textAlign: ta || textAlign || "center",
      }}
    />
  );
};

export default H5;
