import Typography from "src/components/general/typography/Typography";

const GreyTextParagraph = (props) => {
  const { ...restOfProps } = props;

  return (
    <Typography {...restOfProps} component="p" variant="p" color="GrayText" />
  );
};

export default GreyTextParagraph;
