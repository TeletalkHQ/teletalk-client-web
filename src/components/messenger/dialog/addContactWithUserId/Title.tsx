import Box from "~/components/general/box";
import H5 from "~/components/general/typography/header/H5";

const Title = () => {
  return (
    <>
      <Box.Flex jc="space-between" ai="center">
        <Box.Div>
          <H5>Add Contact</H5>
        </Box.Div>
        <Box.Div></Box.Div>
      </Box.Flex>
    </>
  );
};

export default Title;
