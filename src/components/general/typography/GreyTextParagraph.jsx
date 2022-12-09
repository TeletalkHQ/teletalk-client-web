import CustomTypography from "src/components/general/typography/CustomTypography";

const GreyTextParagraph = (props) => {
  const { ...restOfProps } = props;

  return (
    <CustomTypography
      {...restOfProps}
      component="p"
      variant="p"
      color="GrayText"
    />
  );
};

export default GreyTextParagraph;
