const { Box } = require("@mui/material");

const CustomFlexBox = ({
  row,
  col,
  jc,
  ai,
  alignItems,
  justifyContent,
  fd,
  flexDirection,

  ...props
}) => {
  const boxFlexDirection =
    (row && "row") || (col && "column") || fd || flexDirection || "row";

  const boxJustifyContent = jc || justifyContent || "flex-start";

  const boxAlignItems = ai || alignItems || "flex-start";

  return (
    <Box
      flexDirection={boxFlexDirection}
      justifyContent={boxJustifyContent}
      alignItems={boxAlignItems}
      {...props}
      display="flex"
    />
  );
};

export default CustomFlexBox;
