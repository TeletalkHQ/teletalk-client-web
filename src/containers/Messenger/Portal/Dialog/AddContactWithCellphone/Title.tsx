import { Box, Typography } from "~/components";

const Title = () => {
  return (
    <>
      <Box.Flex jc="space-between" ai="center">
        <Box.Div>
          <Typography.H5>New Contact</Typography.H5>
        </Box.Div>
        <Box.Div></Box.Div>
      </Box.Flex>
    </>
  );
};

export default Title;
